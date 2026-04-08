import { Schema, model, Document, Types } from 'mongoose';
const inspectionRecordSchema = new Schema({
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
export default model('InspectionRecord', inspectionRecordSchema);
//# sourceMappingURL=InspectionRecord.js.map