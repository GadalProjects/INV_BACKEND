import { Router } from 'express';
import { requestPart, issuePart, getJobParts, getAllPendingParts } from '../controllers/partRequestController.js';
import { auth, checkRole } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = Router();

// Technician - Requisition Voucher
router.post('/request', auth, checkRole([UserRole.TECHNICIAN]), requestPart);

// Stores - Approve/Issue Parts
router.patch('/:id/issue', auth, checkRole([UserRole.STORES]), issuePart);

// General - View Parts per job
router.get('/job/:jobCardId', auth, getJobParts);

// Stores - Dashboard view
router.get('/pending', auth, checkRole([UserRole.STORES]), getAllPendingParts);

export default router;
