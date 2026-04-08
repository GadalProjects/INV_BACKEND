import { Router } from 'express';
import { generateInvoice, closeJob } from '../controllers/billingController.js';
import { auth, checkRole } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';
const router = Router();
// After Sales / Finance - Generate Draft Invoice
router.get('/:id/invoice', auth, checkRole([UserRole.FINANCE]), generateInvoice);
// After Sales / Finance - Final Job Closure
router.post('/:id/close', auth, checkRole([UserRole.FINANCE]), closeJob);
export default router;
//# sourceMappingURL=billingRoutes.js.map