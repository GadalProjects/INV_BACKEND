import LaborLog from '../models/LaborLog.js';
import JobCard, { JobStatus } from '../models/JobCard.js';
export const clockIn = async (req, res) => {
    try {
        const { jobCardId } = req.body;
        const technicianId = req.user?.id;
        if (!technicianId)
            return res.status(401).json({ message: 'Unauthorized' });
        // Check if Job is Authorized (ACTIVE)
        const job = await JobCard.findById(jobCardId);
        if (!job)
            return res.status(404).json({ message: 'Job Card not found' });
        if (job.status !== JobStatus.ACTIVE) {
            return res.status(403).json({ message: 'Cannot clock in: Job is not Authorized/Active' });
        }
        // Check if already clocked in to any job
        const activeLog = await LaborLog.findOne({ technician: technicianId, endTime: { $exists: false } });
        if (activeLog) {
            return res.status(400).json({ message: 'You are already clocked into a job. Please clock out first.' });
        }
        const newLog = new LaborLog({
            technician: technicianId,
            jobCard: jobCardId,
            startTime: new Date()
        });
        await newLog.save();
        res.status(201).json({ message: 'Clocked in successfully', log: newLog });
    }
    catch (error) {
        res.status(500).json({ message: 'Error clocking in', error });
    }
};
export const clockOut = async (req, res) => {
    try {
        const technicianId = req.user?.id;
        if (!technicianId)
            return res.status(401).json({ message: 'Unauthorized' });
        const activeLog = await LaborLog.findOne({ technician: technicianId, endTime: { $exists: false } });
        if (!activeLog) {
            return res.status(400).json({ message: 'No active clock-in found' });
        }
        activeLog.endTime = new Date();
        // Calculate hours (simple diff)
        const diffMs = activeLog.endTime.getTime() - activeLog.startTime.getTime();
        const hours = diffMs / (1000 * 60 * 60);
        activeLog.totalDurationHours = parseFloat(hours.toFixed(2));
        await activeLog.save();
        // Update JobCard total hours
        const allLogs = await LaborLog.find({ jobCard: activeLog.jobCard });
        const totalHours = allLogs.reduce((sum, log) => sum + (log.totalDurationHours || 0), 0);
        await JobCard.findByIdAndUpdate(activeLog.jobCard, { totalLaborHours: totalHours });
        res.json({ message: 'Clocked out successfully', log: activeLog, totalJobHours: totalHours });
    }
    catch (error) {
        res.status(500).json({ message: 'Error clocking out', error });
    }
};
export const getTechnicianLogs = async (req, res) => {
    try {
        const technicianId = req.user?.id;
        if (!technicianId)
            return res.status(401).json({ message: 'Unauthorized' });
        const logs = await LaborLog.find({ technician: technicianId }).populate('jobCard').sort({ createdAt: -1 });
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};
//# sourceMappingURL=laborController.js.map