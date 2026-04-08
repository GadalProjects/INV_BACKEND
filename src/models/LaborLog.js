import { Schema, model, Document, Types } from 'mongoose';
const laborLogSchema = new Schema({
    technician: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobCard: { type: Schema.Types.ObjectId, ref: 'JobCard', required: true },
    startTime: { type: Date, required: true, default: Date.now },
    endTime: { type: Date },
    totalDurationHours: { type: Number, default: 0 }
}, {
    timestamps: true
});
export default model('LaborLog', laborLogSchema);
//# sourceMappingURL=LaborLog.js.map