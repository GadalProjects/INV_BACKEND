import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const createInspectionRecord: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signOffQC: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getJobInspection: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=inspectionController.d.ts.map