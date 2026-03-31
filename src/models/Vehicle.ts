import { Schema, model, Document } from 'mongoose';

export enum VehicleCategory {
  CV = 'CV', // Commercial Vehicle
  CE = 'CE'  // Construction Equipment
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

const vehicleSchema = new Schema<IVehicle>({
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

export default model<IVehicle>('Vehicle', vehicleSchema);
