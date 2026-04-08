import { Schema, model, Document, Types } from 'mongoose';
export var PartStatus;
(function (PartStatus) {
    PartStatus["REQUESTED"] = "REQUESTED";
    PartStatus["PENDING"] = "PENDING";
    PartStatus["ISSUED"] = "ISSUED";
    PartStatus["REJECTED"] = "REJECTED";
})(PartStatus || (PartStatus = {}));
const partRequestSchema = new Schema({
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
export default model('PartRequest', partRequestSchema);
//# sourceMappingURL=PartRequest.js.map