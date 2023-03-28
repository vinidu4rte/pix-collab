import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Subscription,
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
import { Decimal } from "decimal.js";

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

      const decimal = new Decimal(value);

      const partialChargeValue = decimal
        .dividedBy(collaboratorsQuantity)
        .toFixed(0);

      const woovi = new Woovi();

      for (let i = 0; i < collaboratorsQuantity; i++) {
        const correlationId = randomUUID();

        const chargeDto: WooviCreateChargeDto = {
          correlationID: correlationId,
          comment: `Cobrança ${i + 1}`,
          expiresIn: 9999999999999,
          value: Number(partialChargeValue),
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
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => String)
  async fakeChargePayment(@Arg("data") data: FakeChargePaymentInput) {
    try {
      const { transactionId } = data;
      const woovi = new Woovi();
      await woovi.charge.pay(transactionId);

      return "OK";
    } catch (error) {
      throw error;
    }
  }

  @Subscription(() => Charge, {
    topics: "PARTIAL_CHARGE_PAYMENT",
  })
  async newNotification(
    @Root() notificationPayload: { id: string },
    @Arg("chargeId") chargeId: string
  ) {
    const charge = await ChargeModel.findById(chargeId);

    if (!charge) {
      throw new Error("Charge not found");
    }

    return charge;
  }

  @FieldResolver(() => [PartialCharge]!)
  async partialCharge(@Root() charge: Charge | any) {
    let chargeId;

    if (charge._doc) {
      chargeId = charge._doc._id;
    } else {
      chargeId = charge.id;
    }
    return await PartialChargeModel.find({ chargeId });
  }
}
