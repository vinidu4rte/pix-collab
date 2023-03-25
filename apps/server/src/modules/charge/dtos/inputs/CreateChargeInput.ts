import { InputType, Field } from "type-graphql";
import { IsInt, Min, Max } from "class-validator";

@InputType()
export class CreateChargeInput {
  @Field()
  @IsInt()
  @Min(0.01)
  @Max(5000)
  value: number;

  @Field()
  @IsInt()
  @Min(2)
  @Max(8)
  collaboratorsQuantity: number;
}
