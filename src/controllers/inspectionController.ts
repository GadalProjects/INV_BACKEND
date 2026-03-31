import type { Request, Response } from 'express';
import InspectionRecord from '../models/InspectionRecord.js';
import JobCard, { JobStatus } from '../models/JobCard.js';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const createInspectionRecord = async (req: AuthRequest, res: Response) => {
  try {
    const { jobCardId, findings, checklist, additionalWorkFound } = req.body;
    const inspectorId = req.user?.id;

    if (!inspectorId) return res.status(401).json({ message: 'Unauthorized' });

    const newRecord = new InspectionRecord({
      jobCard: jobCardId,
      inspector: inspectorId,
      findings,
      checklist,
      additionalWorkFound
    });

    await newRecord.save();

    // Update Job status to PENDING_AUTHORIZATION once inspection is done
    await JobCard.findByIdAndUpdate(jobCardId, { 
        status: JobStatus.PENDING_AUTHORIZATION,
    });

    res.status(201).json({ message: 'Inspection record created', record: newRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error creating inspection record', error });
  }
};

export const signOffQC = async (req: AuthRequest, res: Response) => {
  try {
    const { jobCardId } = req.params;
    if (!jobCardId) return res.status(400).json({ message: 'Job Card ID is required' });

    const record = await InspectionRecord.findOne({ jobCard: jobCardId as any }).sort({ createdAt: -1 });
    if (!record) return res.status(404).json({ message: 'No inspection record found for this job' });

    record.qcSignOff = true;
    await record.save();

    // Final Gate: Move to QC status or prepare for Closure
    await JobCard.findByIdAndUpdate(jobCardId, { isQCComplete: true });

    res.json({ message: 'QC sign-off complete', record });
  } catch (error) {
    res.status(500).json({ message: 'Error during QC sign-off', error });
  }
};

export const getJobInspection = async (req: Request, res: Response) => {
  try {
    const { jobCardId } = req.params;
    if (!jobCardId) return res.status(400).json({ message: 'Job Card ID is required' });

    const record = await InspectionRecord.findOne({ jobCard: jobCardId as any }).populate('inspector', 'name');
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inspection record', error });
  }
};
