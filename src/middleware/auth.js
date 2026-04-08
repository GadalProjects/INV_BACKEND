import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User.js';
export const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not defined in environment variables');
        res.status(500).json({ message: 'Server configuration error' });
        return;
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access denied: Insufficient permissions' });
            return;
        }
        next();
    };
};
//# sourceMappingURL=auth.js.map