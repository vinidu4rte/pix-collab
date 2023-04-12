/**
 * @generated SignedSource<<2fce51c4faaacf2f9fd9995ea3062551>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FakeChargePaymentInput = {
  transactionId: string;
};
export type QrCodeChargeMutation$variables = {
  data: FakeChargePaymentInput;
};
export type QrCodeChargeMutation$data = {
  readonly fakeChargePayment: string;
};
export type QrCodeChargeMutation = {
  response: QrCodeChargeMutation$data;
  variables: QrCodeChargeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "kind": "ScalarField",
    "name": "fakeChargePayment",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QrCodeChargeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QrCodeChargeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "83c35692cadd1ad1c4e505ba040c9b1d",
    "id": null,
    "metadata": {},
    "name": "QrCodeChargeMutation",
    "operationKind": "mutation",
    "text": "mutation QrCodeChargeMutation(\n  $data: FakeChargePaymentInput!\n) {\n  fakeChargePayment(data: $data)\n}\n"
  }
};
})();

(node as any).hash = "b875f597ebf28501dd3983b3a297aa7d";

export default node;
