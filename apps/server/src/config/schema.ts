import { buildSchema } from "type-graphql";
import { ChargeResolver } from "../modules/charge/ChargeResolver";
import path from "path";

export const createSchema = async () =>
  buildSchema({
    resolvers: [ChargeResolver],
  });
