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

@Resolver(() => Charge)
export class ChargeResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
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

  @FieldResolver(() => [PartialCharge]!)
  async partialCharge(@Root() charge: Charge | any) {
    const chargeId = charge._doc._id;
    return await PartialChargeModel.find({ chargeId });
  }
}
