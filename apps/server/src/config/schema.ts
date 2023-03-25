import { buildSchema } from "type-graphql";
import { HelloResolver } from "../modules/HelloResolver";

export const createSchema = async () =>
  buildSchema({
    resolvers: [HelloResolver],
  });
