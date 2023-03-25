import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Charge } from "./dtos/entities/Charge";
import { PartialCharge } from "./dtos/entities/PartialCharge";
import { CreateChargeInput } from "./dtos/inputs/CreateChargeInput";
import ChargeModel from "./models/ChargeModel";
import { PartialChargeModel } from "./models/PartialChargeModel";

@Resolver(() => Charge)
export class ChargeResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }

  @Mutation(() => Charge)
  async createCharge(@Arg("data") data: CreateChargeInput) {
    const { collaboratorsQuantity, value } = data;

    const charge = await ChargeModel.create({
      value,
      collaboratorsQuantity,
    });

    return charge;
  }

  @FieldResolver(() => [PartialCharge]!)
  async partialCharge(@Root() charge: Charge) {
    const { id } = charge;

    const partialCharges = PartialChargeModel.find({ chargeId: id });

    return partialCharges;
  }
}
