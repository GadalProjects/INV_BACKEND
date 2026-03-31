import { Router } from 'express';
import { createInspectionRecord, signOffQC, getJobInspection } from '../controllers/inspectionController.js';
import { auth, checkRole } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = Router();

// Inspector - Findings & Checklist
router.post('/record', auth, checkRole([UserRole.INSPECTOR]), createInspectionRecord);

// Inspector - QC Sign-off (Gate 2)
router.patch('/:jobCardId/qc-sign-off', auth, checkRole([UserRole.INSPECTOR]), signOffQC);

// Common - View Inspection for job
router.get('/job/:jobCardId', auth, getJobInspection);

export default router;
