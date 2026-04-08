import { Router } from 'express';
import { getUsersByRole, getAllUsers } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getAllUsers);
router.get('/role/:role', auth, getUsersByRole);

export default router;
