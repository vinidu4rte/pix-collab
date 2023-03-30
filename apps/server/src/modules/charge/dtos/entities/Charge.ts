import { ObjectType, Field, ID } from "type-graphql";
import { Node } from "../../../relay/interfaces/Node";

@ObjectType()
export class Charge extends Node {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  globalId: string;

  @Field()
  status: string;

  @Field()
  collaboratorsQuantity: number;

  @Field()
  value: number;
}
