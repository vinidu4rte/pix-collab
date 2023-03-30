/**
 * @generated SignedSource<<95ad8b611d32952f748a9b1b1b15c756>>
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
    readonly globalId: string;
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
  "name": "globalId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
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
          (v5/*: any*/),
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
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PartialCharge",
            "kind": "LinkedField",
            "name": "partialCharge",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v4/*: any*/),
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
    "cacheID": "2255bc575eb83e3d4f2e22eeb8106466",
    "id": null,
    "metadata": {},
    "name": "ChargeQuery",
    "operationKind": "query",
    "text": "query ChargeQuery(\n  $chargeId: String!\n) {\n  charge(id: $chargeId) {\n    id\n    globalId\n    status\n    value\n    partialCharge {\n      id\n      ...QrCodeChargeFragment\n    }\n  }\n}\n\nfragment QrCodeChargeFragment on PartialCharge {\n  id\n  value\n  status\n  transactionId\n  qrCode\n}\n"
  }
};
})();

(node as any).hash = "1995a615143f183e01e8461db36fa8cb";

export default node;
