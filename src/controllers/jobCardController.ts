import type { Request, Response } from 'express';
import JobCard, { JobStatus } from '../models/JobCard.js';
import Vehicle from '../models/Vehicle.js';
import { v4 as uuidv4 } from 'uuid';

export const createVRS = async (req: Request, res: Response) => {
  try {
    const { 
      make, vehicleModel, plateNumber, vin, category, 
      customerName, customerEmail, customerPhone 
    } = req.body;

    // 1. Find or Create Vehicle
    let vehicle = await Vehicle.findOne({ plateNumber });
    if (!vehicle) {
      vehicle = new Vehicle({
        make, vehicleModel, plateNumber, vin, category,
        customerName, customerEmail, customerPhone
      });
      await vehicle.save();
    }

    // 2. Generate Unique Job Card ID
    const jobCardID = `JC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Create Job Card
    const newJobCard = new JobCard({
      jobCardID,
      vehicle: vehicle._id,
      status: JobStatus.RECEIVED,
      isVRSComplete: true
    });

    await newJobCard.save();

    res.status(201).json({
      message: 'Vehicle Received & Job Card Created',
      jobCard: newJobCard,
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating VRS', error });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const jobs = await JobCard.find(filter).populate('vehicle').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

export const getMyTasks = async (req: any, res: Response) => {
  try {
    const technicianId = req.user?.id;
    if (!technicianId) return res.status(401).json({ message: 'Unauthorized' });

    const jobs = await JobCard.find({ technician: technicianId })
      .populate('vehicle')
      .sort({ updatedAt: -1 });
      
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching technician tasks', error });
  }
};

export const getJobDetails = async (req: Request, res: Response) => {
  try {
    const job = await JobCard.findById(req.params.id)
      .populate('vehicle')
      .populate('technician', 'name email role')
      .populate('foreman', 'name email role')
      .populate('inspector', 'name email role');
      
    if (!job) return res.status(404).json({ message: 'Job Card not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error });
  }
};

export const updateJobStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes, findings } = req.body;
    const update: any = {};
    if (status) update.status = status;
    if (notes) update.repairNotes = notes;
    if (findings) update.findings = findings;

    const job = await JobCard.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job Card not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
