import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PartialCharge {
  @Field()
  id: string;

  @Field()
  correlationId: string;

  @Field()
  transactionId: string;

  @Field()
  status: string;

  @Field()
  value: number;

  @Field()
  qrCode: string;
}
