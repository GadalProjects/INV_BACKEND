import { Schema, model, Document } from 'mongoose';
export var UserRole;
(function (UserRole) {
    UserRole["RECEIVING"] = "RECEIVING";
    UserRole["INSPECTOR"] = "INSPECTOR";
    UserRole["FOREMAN"] = "FOREMAN";
    UserRole["TECHNICIAN"] = "TECHNICIAN";
    UserRole["STORES"] = "STORES";
    UserRole["FINANCE"] = "FINANCE";
})(UserRole || (UserRole = {}));
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
        default: UserRole.TECHNICIAN
    },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
export default model('User', userSchema);
//# sourceMappingURL=User.js.map