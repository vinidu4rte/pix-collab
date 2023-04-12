/**
 * @generated SignedSource<<7585c271bd90f549d698a77c7421f17c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateChargeInput = {
  collaboratorsQuantity: number;
  value: number;
};
export type pagesMutation$variables = {
  data: CreateChargeInput;
};
export type pagesMutation$data = {
  readonly createCharge: {
    readonly id: string;
  };
};
export type pagesMutation = {
  response: pagesMutation$data;
  variables: pagesMutation$variables;
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
    "concreteType": "Charge",
    "kind": "LinkedField",
    "name": "createCharge",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "pagesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pagesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3aad1a4adcc7b5db17f283afe32bc726",
    "id": null,
    "metadata": {},
    "name": "pagesMutation",
    "operationKind": "mutation",
    "text": "mutation pagesMutation(\n  $data: CreateChargeInput!\n) {\n  createCharge(data: $data) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d3d651aafae88c757c8fa89f833b4352";

export default node;
