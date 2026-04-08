import { Document, Types } from 'mongoose';
interface IInspectionRecord extends Document {
    jobCard: Types.ObjectId;
    inspector: Types.ObjectId;
    findings: string;
    checklist: {
        item: string;
        status: 'OK' | 'REPAIR' | 'REPLACE';
        notes?: string;
    }[];
    additionalWorkFound: boolean;
    qcSignOff: boolean;
}
declare const _default: import("mongoose").Model<IInspectionRecord, {}, {}, {}, Document<unknown, {}, IInspectionRecord, {}, import("mongoose").DefaultSchemaOptions> & IInspectionRecord & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IInspectionRecord>;
export default _default;
//# sourceMappingURL=InspectionRecord.d.ts.map