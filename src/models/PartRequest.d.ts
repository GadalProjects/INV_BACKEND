import { Document, Types } from 'mongoose';
export declare enum PartStatus {
    REQUESTED = "REQUESTED",
    PENDING = "PENDING",
    ISSUED = "ISSUED",
    REJECTED = "REJECTED"
}
interface IPartRequest extends Document {
    jobCard: Types.ObjectId;
    partID: string;
    partName: string;
    quantity: number;
    unitPriceAtTime: number;
    status: PartStatus;
}
declare const _default: import("mongoose").Model<IPartRequest, {}, {}, {}, Document<unknown, {}, IPartRequest, {}, import("mongoose").DefaultSchemaOptions> & IPartRequest & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPartRequest>;
export default _default;
//# sourceMappingURL=PartRequest.d.ts.map