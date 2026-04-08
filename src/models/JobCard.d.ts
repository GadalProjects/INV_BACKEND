import { Document, Types } from 'mongoose';
export declare enum JobStatus {
    RECEIVED = "RECEIVED",
    PENDING_INSPECTION = "PENDING_INSPECTION",
    PENDING_AUTHORIZATION = "PENDING_AUTHORIZATION",
    ACTIVE = "ACTIVE",
    QC = "QC",
    CLOSED = "CLOSED"
}
interface IJobCard extends Document {
    jobCardID: string;
    vehicle: Types.ObjectId;
    status: JobStatus;
    technician?: Types.ObjectId;
    foreman?: Types.ObjectId;
    inspector?: Types.ObjectId;
    totalLaborHours: number;
    totalPartsCost: number;
    totalLaborCost: number;
    customerAttachments: string[];
    isVRSComplete: boolean;
    isQCComplete: boolean;
}
declare const _default: import("mongoose").Model<IJobCard, {}, {}, {}, Document<unknown, {}, IJobCard, {}, import("mongoose").DefaultSchemaOptions> & IJobCard & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJobCard>;
export default _default;
//# sourceMappingURL=JobCard.d.ts.map