import { Schema, model, Document, Types } from 'mongoose';
export var JobStatus;
(function (JobStatus) {
    JobStatus["RECEIVED"] = "RECEIVED";
    JobStatus["PENDING_INSPECTION"] = "PENDING_INSPECTION";
    JobStatus["PENDING_AUTHORIZATION"] = "PENDING_AUTHORIZATION";
    JobStatus["ACTIVE"] = "ACTIVE";
    JobStatus["QC"] = "QC";
    JobStatus["CLOSED"] = "CLOSED";
})(JobStatus || (JobStatus = {}));
const jobCardSchema = new Schema({
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
export default model('JobCard', jobCardSchema);
//# sourceMappingURL=JobCard.js.map