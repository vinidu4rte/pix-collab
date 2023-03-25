import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateChargeInput } from "./dtos/inputs/CreateChargeInput";

@Resolver()
export class ChargeResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }

  @Mutation(() => String)
  async createCharge(@Arg("data") data: CreateChargeInput) {
    const { collaboratorsQuantity, value } = data;

    console.log(collaboratorsQuantity, value);
  }
}
