import { Query, Resolver, Arg } from "type-graphql";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { Node } from "./interfaces/Node";
import ChargeModel from "../charge/models/ChargeModel";
import { Charge } from "../charge/dtos/entities/Charge";

@Resolver(Node)
export class NodeResolver {
  @Query(() => Charge, { nullable: true })
  async node(@Arg("globalId") globalId: string) {
    const { type, id: localId } = fromGlobalId(globalId);
    if (type === "Charge") {
      const charge = await ChargeModel.findById(localId);

      if (!charge) {
        return null;
      }

      const formatedObject: Charge = {
        id: charge.id,
        globalId: toGlobalId("Charge", charge.id),
        collaboratorsQuantity: charge.collaboratorsQuantity,
        status: charge.status,
        value: charge.value,
      };

      return formatedObject;
    }
    return null;
  }
}
