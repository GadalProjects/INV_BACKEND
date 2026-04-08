import { Document } from 'mongoose';
export declare enum UserRole {
    RECEIVING = "RECEIVING",
    INSPECTOR = "INSPECTOR",
    FOREMAN = "FOREMAN",
    TECHNICIAN = "TECHNICIAN",
    STORES = "STORES",
    FINANCE = "FINANCE"
}
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map