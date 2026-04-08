import type { Request, Response } from 'express';
import JobCard, { JobStatus } from '../models/JobCard.js';

export const assignTechnician = async (req: any, res: Response) => {
  try {
    const { technicianId } = req.body;
    const foremanId = req.user?.id;
    const job = await JobCard.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job Card not found' });

    job.technician = technicianId;
    job.foreman = foremanId;
    job.status = JobStatus.ACTIVE;

    await job.save();

    res.json({ message: 'Technician assigned successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning technician', error });
  }
};
