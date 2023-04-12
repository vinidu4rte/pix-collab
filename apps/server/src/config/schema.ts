import { buildSchema } from "type-graphql";
import { ChargeResolver } from "../modules/charge/ChargeResolver";
import { PubSub } from "graphql-subscriptions";
import { NodeResolver } from "../modules/relay/NodeResolver";

export const pubsub = new PubSub();

export const createSchema = async () =>
  buildSchema({
    resolvers: [ChargeResolver, NodeResolver],
    pubSub: pubsub,
    emitSchemaFile: true,
  });
