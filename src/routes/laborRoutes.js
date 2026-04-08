import { Router } from 'express';
import { clockIn, clockOut, getTechnicianLogs } from '../controllers/laborController.js';
import { auth, checkRole } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';
const router = Router();
// Technician only
router.post('/clock-in', auth, checkRole([UserRole.TECHNICIAN]), clockIn);
router.post('/clock-out', auth, checkRole([UserRole.TECHNICIAN]), clockOut);
router.get('/my-logs', auth, getTechnicianLogs);
export default router;
//# sourceMappingURL=laborRoutes.js.map