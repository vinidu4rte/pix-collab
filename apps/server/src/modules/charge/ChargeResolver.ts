import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Subscription,
} from "type-graphql";
import { toGlobalId } from "graphql-relay";
import { db } from "../../config/database";
import { Woovi, WooviCreateChargeDto } from "../../lib/woovi";
import { Charge } from "./dtos/entities/Charge";
import { PartialCharge } from "./dtos/entities/PartialCharge";
import { CreateChargeInput } from "./dtos/inputs/CreateChargeInput";
import ChargeModel from "./models/ChargeModel";
import {
  PartialChargeDocument,
  PartialChargeModel,
} from "./models/PartialChargeModel";
import { randomUUID } from "crypto";
import { FakeChargePaymentInput } from "./dtos/inputs/FakeChargePaymentInput";
import { Decimal } from "decimal.js";
import { formatChargeDocumentForChargeObjectType } from "./utils/formatChargeDocumentForChargeObjectType";

@Resolver(() => Charge)
export class ChargeResolver {
  @Query(() => Charge)
  async charge(@Arg("id") id: string): Promise<Charge> {
    const charge = await ChargeModel.findById(id);

    if (!charge) {
      return null;
    }

    const formatedObject: Charge = {
      id: charge.id,
      globalId: toGlobalId("Charge", charge.id),
      collaboratorsQuantity: charge.collaboratorsQuantity,
      status: charge.status,
      value: charge.value,
    };

    return formatedObject;
  }

  @Mutation(() => Charge)
  async createCharge(@Arg("data") data: CreateChargeInput): Promise<Charge> {
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

      const formatedObject: Charge = {
        id: charge.id,
        globalId: toGlobalId("Charge", charge.id),
        collaboratorsQuantity: charge.collaboratorsQuantity,
        status: charge.status,
        value: charge.value,
      };

      return formatedObject;
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
  ): Promise<Charge> {
    const charge = await ChargeModel.findById(chargeId);

    if (!charge) {
      throw new Error("Charge not found");
    }

    const formatedObject: Charge = {
      id: charge.id,
      globalId: toGlobalId("Charge", charge.id),
      collaboratorsQuantity: charge.collaboratorsQuantity,
      status: charge.status,
      value: charge.value,
    };

    return formatedObject;
  }

  @FieldResolver(() => [PartialCharge]!)
  async partialCharge(@Root() charge: Charge) {
    const chargeId = charge.id;
    return await PartialChargeModel.find({ chargeId });
  }
}
