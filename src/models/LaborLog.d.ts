import { Document, Types } from 'mongoose';
interface ILaborLog extends Document {
    technician: Types.ObjectId;
    jobCard: Types.ObjectId;
    startTime: Date;
    endTime?: Date;
    totalDurationHours: number;
}
declare const _default: import("mongoose").Model<ILaborLog, {}, {}, {}, Document<unknown, {}, ILaborLog, {}, import("mongoose").DefaultSchemaOptions> & ILaborLog & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILaborLog>;
export default _default;
//# sourceMappingURL=LaborLog.d.ts.map