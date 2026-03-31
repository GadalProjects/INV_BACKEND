import { Schema, model, Document, Types } from 'mongoose';

interface IInspectionRecord extends Document {
  jobCard: Types.ObjectId;
  inspector: Types.ObjectId;
  findings: string;
  checklist: {
     item: string;
     status: 'OK' | 'REPAIR' | 'REPLACE';
     notes?: string;
  }[];
  additionalWorkFound: boolean;
  qcSignOff: boolean;
}

const inspectionRecordSchema = new Schema<IInspectionRecord>({
  jobCard: { type: Schema.Types.ObjectId, ref: 'JobCard', required: true },
  inspector: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  findings: { type: String },
  checklist: [{
     item: { type: String, required: true },
     status: { type: String, enum: ['OK', 'REPAIR', 'REPLACE'], required: true },
     notes: { type: String }
  }],
  additionalWorkFound: { type: Boolean, default: false },
  qcSignOff: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IInspectionRecord>('InspectionRecord', inspectionRecordSchema);
