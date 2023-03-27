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
import { ChargeSubscriptionInput } from "./dtos/inputs/ChargeSubscriptionInput";

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

  @Subscription({
    topics: "PARTIAL_CHARGE_PAYMENT",
    filter: ({ payload, args }) => payload._id.toString() === args.chargeId,
  })
  newNotification(
    @Root() notificationPayload: ChargeSubscriptionInput | any,
    @Arg("chargeId") chargeId: string
  ): Charge {
    return {
      id: notificationPayload._id.toString(),
      collaboratorsQuantity: notificationPayload.collaboratorsQuantity,
      status: notificationPayload.status,
      value: notificationPayload.value,
    };
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
