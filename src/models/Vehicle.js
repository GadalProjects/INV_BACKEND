import { Schema, model, Document } from 'mongoose';
export var VehicleCategory;
(function (VehicleCategory) {
    VehicleCategory["CV"] = "CV";
    VehicleCategory["CE"] = "CE"; // Construction Equipment
})(VehicleCategory || (VehicleCategory = {}));
const vehicleSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    vin: { type: String, required: true, unique: true },
    category: { type: String, enum: Object.values(VehicleCategory), required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String }
}, {
    timestamps: true
});
export default model('Vehicle', vehicleSchema);
//# sourceMappingURL=Vehicle.js.map