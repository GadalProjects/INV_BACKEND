import { Router } from 'express';
import { createVRS, getAllJobs, getJobDetails, updateJobStatus } from '../controllers/jobCardController.js';
import { assignTechnician } from '../controllers/assignmentController.js';
import { auth, checkRole } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = Router();

// Receiving - Log Vehicle Entry
router.post('/vrs', auth, checkRole([UserRole.RECEIVING]), createVRS);

// Common - View Jobs
router.get('/', auth, getAllJobs);
router.get('/:id', auth, getJobDetails);

// Foreman - Assign Technician
router.patch('/:id/assign', auth, checkRole([UserRole.FOREMAN]), assignTechnician);

// Authorization/Status Transitions
router.patch('/:id/status', auth, checkRole([UserRole.FOREMAN, UserRole.INSPECTOR, UserRole.FINANCE]), updateJobStatus);

export default router;
