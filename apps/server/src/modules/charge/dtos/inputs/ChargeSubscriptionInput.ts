import { Field, ArgsType } from "type-graphql";

export class ChargeSubscriptionInput {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field()
  collaboratorsQuantity: number;

  @Field()
  value: number;
}

@ArgsType()
export class ChargeSubscriptionArgs {
  @Field()
  chargeId!: string;
}
