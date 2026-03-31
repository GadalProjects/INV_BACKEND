import type { Request, Response } from 'express';
import JobCard, { JobStatus } from '../models/JobCard.js';

const LABOR_HOURLY_RATE = 50; // Example rate
const CONSUMABLES_FEE = 15;
const TAX_RATE = 0.15; // 15%

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await JobCard.findById(id).populate('vehicle');

    if (!job) return res.status(404).json({ message: 'Job Card not found' });

    // Gate 1: Check QC Sign-off
    if (!job.isQCComplete) {
      return res.status(403).json({ message: 'Cannot generate invoice: Final QC sign-off is pending' });
    }

    // Calculation Logic
    const laborCost = job.totalLaborHours * LABOR_HOURLY_RATE;
    const partsCost = job.totalPartsCost;
    const subtotal = laborCost + partsCost + CONSUMABLES_FEE;
    const taxes = subtotal * TAX_RATE;
    const totalAmount = subtotal + taxes;

    // Update JobCard with final costs
    job.totalLaborCost = laborCost;
    await job.save();

    res.json({
      jobCardID: job.jobCardID,
      vehicle: job.vehicle,
      summary: {
        labor: { hours: job.totalLaborHours, rate: LABOR_HOURLY_RATE, cost: laborCost },
        parts: partsCost,
        consumables: CONSUMABLES_FEE,
        subtotal,
        tax: taxes,
        total: totalAmount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating invoice', error });
  }
};

export const closeJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await JobCard.findById(id);

    if (!job) return res.status(404).json({ message: 'Job Card not found' });

    if (!job.isQCComplete) {
      return res.status(403).json({ message: 'Cannot close job: Final QC sign-off required' });
    }

    job.status = JobStatus.CLOSED;
    await job.save();

    res.json({ message: 'Job closed successfully and archived', job });
  } catch (error) {
    res.status(500).json({ message: 'Error closing job', error });
  }
};
