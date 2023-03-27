import { InputType, Field } from "type-graphql";
import { IsInt, Min, Max } from "class-validator";

@InputType()
export class CreateChargeInput {
  @Field()
  @IsInt()
  @Min(1)
  @Max(500000)
  value: number;

  @Field()
  @IsInt()
  @Min(2)
  @Max(4)
  collaboratorsQuantity: number;
}
