import { Schema, model, Document } from 'mongoose';

export enum UserRole {
  RECEIVING = 'RECEIVING',
  INSPECTOR = 'INSPECTOR',
  FOREMAN = 'FOREMAN',
  TECHNICIAN = 'TECHNICIAN',
  STORES = 'STORES',
  FINANCE = 'FINANCE'
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<IUser>({
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

export default model<IUser>('User', userSchema);
