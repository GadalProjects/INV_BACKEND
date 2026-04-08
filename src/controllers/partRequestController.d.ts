import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const requestPart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const issuePart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getJobParts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllPendingParts: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=partRequestController.d.ts.map