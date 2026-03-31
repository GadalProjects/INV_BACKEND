import { Schema, model, Document, Types } from 'mongoose';

export enum JobStatus {
  RECEIVED = 'RECEIVED',
  PENDING_INSPECTION = 'PENDING_INSPECTION',
  PENDING_AUTHORIZATION = 'PENDING_AUTHORIZATION',
  ACTIVE = 'ACTIVE',
  QC = 'QC',
  CLOSED = 'CLOSED'
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
  customerAttachments: string[]; // PDFs/Images
  isVRSComplete: boolean;
  isQCComplete: boolean;
}

const jobCardSchema = new Schema<IJobCard>({
  jobCardID: { type: String, required: true, unique: true },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  status: { 
    type: String, 
    enum: Object.values(JobStatus), 
    default: JobStatus.RECEIVED 
  },
  technician: { type: Schema.Types.ObjectId, ref: 'User' },
  foreman: { type: Schema.Types.ObjectId, ref: 'User' },
  inspector: { type: Schema.Types.ObjectId, ref: 'User' },
  totalLaborHours: { type: Number, default: 0 },
  totalPartsCost: { type: Number, default: 0 },
  totalLaborCost: { type: Number, default: 0 },
  customerAttachments: [{ type: String }],
  isVRSComplete: { type: Boolean, default: false },
  isQCComplete: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IJobCard>('JobCard', jobCardSchema);
