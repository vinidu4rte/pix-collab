import { InputType, Field } from "type-graphql";
import { IsInt, Min, Max } from "class-validator";

@InputType()
export class CreateChargeInput {
  @Field()
  @IsInt()
  @Min(100) // 1 BRL
  @Max(1000000) // 10.000 BRL
  value: number;

  @Field()
  @IsInt()
  @Min(2)
  @Max(4)
  collaboratorsQuantity: number;
}
