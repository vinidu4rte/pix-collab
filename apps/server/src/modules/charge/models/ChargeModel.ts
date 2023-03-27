import { Document, Schema, model } from "mongoose";
import { PartialCharge } from "./PartialChargeModel";

export interface Charge {
  status: string;
  value: number;
  collaboratorsQuantity: number;
  partialCharges?: PartialCharge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChargeDocument extends Charge, Document {}

const chargeSchema = new Schema<ChargeDocument>(
  {
    status: { type: String, default: "pending" },
    value: { type: Number, required: true },
    collaboratorsQuantity: { type: Number, required: true },
    partialCharges: [{ type: Schema.Types.ObjectId, ref: "PartialCharge" }],
  },
  { timestamps: true }
);

const ChargeModel = model<Charge>("Charge", chargeSchema);

export default ChargeModel;
