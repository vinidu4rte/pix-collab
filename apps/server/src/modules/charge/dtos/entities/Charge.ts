import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Charge {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field()
  collaboratorsQuantity: number;

  @Field()
  value: number;
}
