import type { Request, Response } from 'express';
export declare const createVRS: (req: Request, res: Response) => Promise<void>;
export declare const getAllJobs: (req: Request, res: Response) => Promise<void>;
export declare const getJobDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateJobStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=jobCardController.d.ts.map