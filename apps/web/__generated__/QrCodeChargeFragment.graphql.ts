/**
 * @generated SignedSource<<281bc3db6c35bb219284c8bc43d9fb7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QrCodeChargeFragment$data = {
  readonly id: string;
  readonly qrCode: string;
  readonly status: string;
  readonly transactionId: string;
  readonly value: number;
  readonly " $fragmentType": "QrCodeChargeFragment";
};
export type QrCodeChargeFragment$key = {
  readonly " $data"?: QrCodeChargeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QrCodeChargeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QrCodeChargeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
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
  "type": "PartialCharge",
  "abstractKey": null
};

(node as any).hash = "ab44cd12ce03d0220542cffd26322699";

export default node;
