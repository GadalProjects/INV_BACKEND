import type { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User.js';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const auth: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const checkRole: (roles: UserRole[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map