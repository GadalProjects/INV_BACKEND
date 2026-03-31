import { Schema, model, Document, Types } from 'mongoose';

interface ILaborLog extends Document {
  technician: Types.ObjectId;
  jobCard: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  totalDurationHours: number;
}

const laborLogSchema = new Schema<ILaborLog>({
  technician: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jobCard: { type: Schema.Types.ObjectId, ref: 'JobCard', required: true },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date },
  totalDurationHours: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default model<ILaborLog>('LaborLog', laborLogSchema);
