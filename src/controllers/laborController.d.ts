import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const clockIn: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clockOut: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTechnicianLogs: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=laborController.d.ts.map