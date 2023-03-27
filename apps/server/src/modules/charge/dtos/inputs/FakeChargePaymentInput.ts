import { InputType, Field } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class FakeChargePaymentInput {
  @Field()
  @MinLength(1)
  @MaxLength(100)
  transactionId: string;
}
