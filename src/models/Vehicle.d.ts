import { Document } from 'mongoose';
export declare enum VehicleCategory {
    CV = "CV",// Commercial Vehicle
    CE = "CE"
}
interface IVehicle extends Document {
    make: string;
    model: string;
    plateNumber: string;
    vin: string;
    category: VehicleCategory;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
}
declare const _default: import("mongoose").Model<IVehicle, {}, {}, {}, Document<unknown, {}, IVehicle, {}, import("mongoose").DefaultSchemaOptions> & IVehicle & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVehicle>;
export default _default;
//# sourceMappingURL=Vehicle.d.ts.map