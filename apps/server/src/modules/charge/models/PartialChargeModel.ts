import { Schema, Document, model, ObjectId } from "mongoose";

export interface PartialCharge {
  chargeId: ObjectId;
  correlationId: string;
  transactionId: string;
  status: string;
  value: number;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartialChargeDocument extends PartialCharge, Document {}

const partialChargeSchema = new Schema<PartialCharge>(
  {
    chargeId: { type: Schema.Types.ObjectId, ref: "Charge", required: true },
    correlationId: { type: String, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
    value: { type: Number, required: true },
    qrCode: { type: String, required: true },
  },
  { timestamps: true }
);

export const PartialChargeModel = model<PartialCharge>(
  "PartialCharge",
  partialChargeSchema
);
