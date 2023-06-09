/**
 * @generated SignedSource<<90aa46486138346f4b36445d88b49381>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChargeSubscription$variables = {
  chargeId: string;
};
export type ChargeSubscription$data = {
  readonly newNotification: {
    readonly id: string;
    readonly partialCharge: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"QrCodeChargeFragment">;
    }>;
    readonly status: string;
    readonly value: number;
  } | null;
};
export type ChargeSubscription = {
  response: ChargeSubscription$data;
  variables: ChargeSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chargeId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "chargeId",
    "variableName": "chargeId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChargeSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Charge",
        "kind": "LinkedField",
        "name": "newNotification",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PartialCharge",
            "kind": "LinkedField",
            "name": "partialCharge",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QrCodeChargeFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChargeSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Charge",
        "kind": "LinkedField",
        "name": "newNotification",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PartialCharge",
            "kind": "LinkedField",
            "name": "partialCharge",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "transactionId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qrCode",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a1c700f34522a9ca05c2bfdafbaf5737",
    "id": null,
    "metadata": {},
    "name": "ChargeSubscription",
    "operationKind": "subscription",
    "text": "subscription ChargeSubscription(\n  $chargeId: String!\n) {\n  newNotification(chargeId: $chargeId) {\n    id\n    status\n    value\n    partialCharge {\n      id\n      ...QrCodeChargeFragment\n    }\n  }\n}\n\nfragment QrCodeChargeFragment on PartialCharge {\n  id\n  value\n  status\n  transactionId\n  qrCode\n}\n"
  }
};
})();

(node as any).hash = "b44501fa4b95071449d726ef1c547253";

export default node;
