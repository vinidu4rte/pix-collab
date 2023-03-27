import { buildSchema } from "type-graphql";
import { ChargeResolver } from "../modules/charge/ChargeResolver";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

export const createSchema = async () =>
  buildSchema({
    resolvers: [ChargeResolver],
    pubSub: pubsub,
  });
