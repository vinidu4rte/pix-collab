import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Charge } from "./dtos/entities/Charge";
import { CreateChargeInput } from "./dtos/inputs/CreateChargeInput";
import ChargeModel from "./models/ChargeModel";

@Resolver()
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
}
