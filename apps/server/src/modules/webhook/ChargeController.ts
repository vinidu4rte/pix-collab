import { Context } from "koa";
import { db } from "../../config/database";
import { config } from "../../config/environment";
import ChargeModel, { ChargeDocument } from "../charge/models/ChargeModel";
import { PartialChargeModel } from "../charge/models/PartialChargeModel";
import { pubsub } from "../../config/schema";

interface WooviWebhook {
  event: string;
}

export const ChargeController = async (ctx: Context) => {
  const session = await db.getInstance().startSession();

  try {
    session.startTransaction();
    const authToken = ctx.request.headers["authorization"];
    const secretToken = config.WOOVI_WEBHOOK_SECRET;

    if (authToken !== secretToken) {
      ctx.status = 401;
      ctx.body = "Unauthorized";
      return;
    }

    const body: WooviWebhook | any = ctx.request.body;

    const { event } = body;
    const EXPECTED_WEBHOOK_EVENT = "OPENPIX:CHARGE_COMPLETED";

    if (event !== EXPECTED_WEBHOOK_EVENT) {
      ctx.status = 400;
      ctx.body = "Invalid event";
      return;
    }

    const transactionId = body.charge.transactionID;
    const partialCharge = await PartialChargeModel.findOne({
      transactionId,
    });

    if (!partialCharge) {
      throw new Error("Partial charge not found");
    }

    const { id, status, chargeId } = partialCharge;
    if (status === "paid") {
      throw new Error("Partial charge already paid");
    }

    const updatedPartialCharge = await PartialChargeModel.findByIdAndUpdate(
      id,
      {
        status: "paid",
      },
      { new: true }
    );

    const partialCharges = await PartialChargeModel.find({ chargeId });
    const hasRemaningCharges = partialCharges.find(
      (partialCharge) => partialCharge.status === "pending"
    );

    let charge: ChargeDocument | null;

    if (!hasRemaningCharges) {
      charge = await ChargeModel.findByIdAndUpdate(
        chargeId,
        {
          status: "paid",
        },
        { new: true }
      ).populate("partialCharges");
    } else {
      charge = await ChargeModel.findById(chargeId).populate("partialCharges");
    }

    await pubsub.publish("PARTIAL_CHARGE_PAYMENT", { id: chargeId });

    session.commitTransaction();
    return updatedPartialCharge;
  } catch (error) {
    session.abortTransaction();
    console.log("Webhook error:", error);
  }
};
