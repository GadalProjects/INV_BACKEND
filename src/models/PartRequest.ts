import { Schema, model, Document, Types } from 'mongoose';

export enum PartStatus {
  REQUESTED = 'REQUESTED',
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  REJECTED = 'REJECTED'
}

interface IPartRequest extends Document {
  jobCard: Types.ObjectId;
  partID: string;
  partName: string;
  quantity: number;
  unitPriceAtTime: number;
  status: PartStatus;
}

const partRequestSchema = new Schema<IPartRequest>({
  jobCard: { type: Schema.Types.ObjectId, ref: 'JobCard', required: true },
  partID: { type: String, required: true },
  partName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPriceAtTime: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: Object.values(PartStatus), 
    default: PartStatus.REQUESTED 
  }
}, {
  timestamps: true
});

export default model<IPartRequest>('PartRequest', partRequestSchema);
