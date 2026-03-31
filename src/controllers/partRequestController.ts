import type { Request, Response } from 'express';
import PartRequest, { PartStatus } from '../models/PartRequest.js';
import JobCard from '../models/JobCard.js';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const requestPart = async (req: AuthRequest, res: Response) => {
  try {
    const { jobCardId, partID, partName, quantity } = req.body;

    const job = await JobCard.findById(jobCardId);
    if (!job) return res.status(404).json({ message: 'Job Card not found' });

    const newRequest = new PartRequest({
      jobCard: jobCardId,
      partID,
      partName,
      quantity,
      status: PartStatus.REQUESTED
    });

    await newRequest.save();
    res.status(201).json({ message: 'Part requested successfully', partRequest: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting part', error });
  }
};

export const issuePart = async (req: AuthRequest, res: Response) => {
  try {
    const { unitPrice } = req.body;
    const partRequest = await PartRequest.findById(req.params.id);

    if (!partRequest) return res.status(404).json({ message: 'Part request not found' });

    partRequest.status = PartStatus.ISSUED;
    partRequest.unitPriceAtTime = unitPrice;
    await partRequest.save();

    // Recalculate JobCard total parts cost
    const allIssuedParts = await PartRequest.find({ 
      jobCard: partRequest.jobCard, 
      status: PartStatus.ISSUED 
    });
    
    const totalPartsCost = allIssuedParts.reduce((sum, p) => sum + (p.quantity * (p.unitPriceAtTime || 0)), 0);
    
    await JobCard.findByIdAndUpdate(partRequest.jobCard, { totalPartsCost });

    res.json({ message: 'Part issued and cost updated', partRequest, totalJobPartsCost: totalPartsCost });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing part', error });
  }
};

export const getJobParts = async (req: Request, res: Response) => {
  try {
    const { jobCardId } = req.params;
    if (!jobCardId) return res.status(400).json({ message: 'Job Card ID is required' });

    const parts = await PartRequest.find({ jobCard: jobCardId });
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job parts', error });
  }
};

export const getAllPendingParts = async (req: Request, res: Response) => {
  try {
    const parts = await PartRequest.find({ status: PartStatus.REQUESTED }).populate('jobCard');
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending parts', error });
  }
};
