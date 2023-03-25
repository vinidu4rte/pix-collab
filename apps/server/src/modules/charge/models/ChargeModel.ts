import { Document, Schema, model } from "mongoose";

export interface Charge {
  status: string;
  value: number;
  collaboratorsQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChargeDocument extends Charge, Document {}

const chargeSchema = new Schema<ChargeDocument>(
  {
    status: { type: String, required: true },
    value: { type: Number, required: true },
    collaboratorsQuantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const ChargeModel = model<Charge>("Charge", chargeSchema);

export default ChargeModel;
