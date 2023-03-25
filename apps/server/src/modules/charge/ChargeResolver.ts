import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { db } from "../../config/database";
import { Woovi, WooviCreateChargeDto } from "../../lib/woovi";
import { Charge } from "./dtos/entities/Charge";
import { PartialCharge } from "./dtos/entities/PartialCharge";
import { CreateChargeInput } from "./dtos/inputs/CreateChargeInput";
import ChargeModel from "./models/ChargeModel";
import { PartialChargeModel } from "./models/PartialChargeModel";
import { randomUUID } from "crypto";
import { FakeChargePaymentInput } from "./dtos/inputs/FakeChargePaymentInput";

@Resolver(() => Charge)
export class ChargeResolver {
  @Query(() => Charge)
  async charge(@Arg("id") id: string) {
    const charge = await ChargeModel.findById(id);

    if (!charge) {
      throw new Error("Charge not found");
    }

    return charge;
  }

  @Mutation(() => Charge)
  async createCharge(@Arg("data") data: CreateChargeInput) {
    const session = await db.getInstance().startSession();

    try {
      session.startTransaction();
      const { collaboratorsQuantity, value } = data;

      const charge = await ChargeModel.create({
        value,
        collaboratorsQuantity,
      });

      const partialChargeValue = value / collaboratorsQuantity;

      const woovi = new Woovi();

      for (let i = 0; i < collaboratorsQuantity; i++) {
        const correlationId = randomUUID();

        const chargeDto: WooviCreateChargeDto = {
          correlationID: correlationId,
          comment: `Cobrança ${i + 1}`,
          expiresIn: 9999999999999,
          value: partialChargeValue,
        };

        const response = await woovi.charge.create(chargeDto);
        const { qrCodeImage, transactionID } = response.charge;

        await PartialChargeModel.create({
          chargeId: charge.id,
          value: partialChargeValue,
          correlationId,
          qrCode: qrCodeImage,
          transactionId: transactionID,
        });
      }

      session.commitTransaction();
      return charge;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  @Mutation(() => PartialCharge)
  async fakeChargePayment(@Arg("data") data: FakeChargePaymentInput) {
    const session = await db.getInstance().startSession();

    try {
      session.startTransaction();
      const { transactionId } = data;

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

      const woovi = new Woovi();
      await woovi.charge.pay(transactionId);

      const updatedPartialCharge = await PartialChargeModel.findByIdAndUpdate(
        id,
        {
          status: "paid",
        },
        { new: true }
      );

      const partialCharges = await PartialChargeModel.find({ chargeId });
      const hasRemaningCharges = partialCharges.find(
        (partialCharge) => partialCharge.status === "pendind"
      );

      if (!hasRemaningCharges) {
        await ChargeModel.findByIdAndUpdate(chargeId, {
          status: "paid",
        });
      }

      session.commitTransaction();
      return updatedPartialCharge;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  @FieldResolver(() => [PartialCharge]!)
  async partialCharge(@Root() charge: Charge | any) {
    const chargeId = charge._doc._id;
    return await PartialChargeModel.find({ chargeId });
  }
}
