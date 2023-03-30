/**
 * @generated SignedSource<<ad8cda01cc169000834f35144ec12be2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ChargeQuery$variables = {
  chargeId: string;
};
export type ChargeQuery$data = {
  readonly charge: {
    readonly globalId: string;
    readonly id: string;
    readonly partialCharge: ReadonlyArray<{
      readonly id: string;
      readonly qrCode: string;
      readonly status: string;
      readonly transactionId: string;
      readonly value: number;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "chargeId"
      }
    ],
    "concreteType": "Charge",
    "kind": "LinkedField",
    "name": "charge",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "globalId",
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "PartialCharge",
        "kind": "LinkedField",
        "name": "partialCharge",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transactionId",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "qrCode",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChargeQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChargeQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "abc0fd2cf378abf3b2a2327243897693",
    "id": null,
    "metadata": {},
    "name": "ChargeQuery",
    "operationKind": "query",
    "text": "query ChargeQuery(\n  $chargeId: String!\n) {\n  charge(id: $chargeId) {\n    id\n    globalId\n    status\n    value\n    partialCharge {\n      value\n      transactionId\n      status\n      qrCode\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e43ee5a8665d4e6abbca99965aa1b6a6";

export default node;
