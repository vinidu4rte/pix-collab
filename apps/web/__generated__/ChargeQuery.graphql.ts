/**
 * @generated SignedSource<<eeb407fd4f4021bcd17cf13b9fbb4e1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChargeQuery$variables = {
  chargeId: string;
};
export type ChargeQuery$data = {
  readonly charge: {
    readonly id: string;
    readonly partialCharge: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"QrCodeChargeFragment">;
    }>;
    readonly status: string;
    readonly value: number;
  } | null;
};
export type ChargeQuery = {
  response: ChargeQuery$data;
  variables: ChargeQuery$variables;
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
    "name": "id",
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
    "name": "ChargeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Charge",
        "kind": "LinkedField",
        "name": "charge",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChargeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Charge",
        "kind": "LinkedField",
        "name": "charge",
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
    "cacheID": "a2a3d9c3e33ea9fc8d93c31977162ecf",
    "id": null,
    "metadata": {},
    "name": "ChargeQuery",
    "operationKind": "query",
    "text": "query ChargeQuery(\n  $chargeId: String!\n) {\n  charge(id: $chargeId) {\n    id\n    status\n    value\n    partialCharge {\n      id\n      ...QrCodeChargeFragment\n    }\n  }\n}\n\nfragment QrCodeChargeFragment on PartialCharge {\n  id\n  value\n  status\n  transactionId\n  qrCode\n}\n"
  }
};
})();

(node as any).hash = "3dad51a04916836facce814288e0c28a";

export default node;
