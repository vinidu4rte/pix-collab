import { Charge } from "../dtos/entities/Charge";
import { ChargeDocument } from "../models/ChargeModel";

export const formatChargeDocumentForChargeObjectType = (
  chargeDocument: ChargeDocument
): Charge => {
  return {
    id: chargeDocument.id,
    value: chargeDocument.value,
    collaboratorsQuantity: chargeDocument.collaboratorsQuantity,
    status: chargeDocument.status,
  };
};
