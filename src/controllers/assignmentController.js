import JobCard, { JobStatus } from '../models/JobCard.js';
export const assignTechnician = async (req, res) => {
    try {
        const { technicianID, foremanID } = req.body;
        const job = await JobCard.findById(req.params.id);
        if (!job)
            return res.status(404).json({ message: 'Job Card not found' });
        job.technician = technicianID;
        job.foreman = foremanID;
        job.status = JobStatus.ACTIVE; // Moves to ACTIVE once technician is assigned
        await job.save();
        res.json({ message: 'Technician assigned successfully', job });
    }
    catch (error) {
        res.status(500).json({ message: 'Error assigning technician', error });
    }
};
//# sourceMappingURL=assignmentController.js.map