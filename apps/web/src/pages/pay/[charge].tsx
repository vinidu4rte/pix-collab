import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";
import { useLazyLoadQuery, useSubscription } from "react-relay";
import { graphql } from "relay-runtime";
import type { ChargeQuery as ChargeQueryType } from "../../../__generated__/ChargeQuery.graphql";
import type { ChargeSubscription as ChargeSubscriptionType } from "../../../__generated__/ChargeSubscription.graphql";
import { useMemo } from "react";

const GET_CHARGE = graphql`
  query ChargeQuery($chargeId: String!) {
    charge(id: $chargeId) {
      id
      globalId
      status
      value
      partialCharge {
        id
        ...QrCodeChargeFragment
      }
    }
  }
`;

const CHARGE_SUBSCRIPTION = graphql`
  subscription ChargeSubscription($chargeId: String!) {
    newNotification(chargeId: $chargeId) {
      id
      globalId
      status
      value
      partialCharge {
        id
        ...QrCodeChargeFragment
      }
    }
  }
`;

export default function Charge({ chargeId }: { chargeId: string }) {
  const config = useMemo(
    () => ({
      variables: {
        chargeId,
      },
      subscription: CHARGE_SUBSCRIPTION,
    }),
    [chargeId]
  );

  useSubscription<ChargeSubscriptionType>(config);

  const { charge } = useLazyLoadQuery<ChargeQueryType>(GET_CHARGE, {
    chargeId,
  });

  if (!charge) {
    return <div>Carregando...</div>;
  }

  const { id, status, value, partialCharge } = charge;

  if (status === "paid") {
    return (
      <ChargeCompleted
        paymentId={id}
        receiverName="Vinicius Duarte"
        totalValue={value / 100}
      />
    );
  }

  return (
    <Layout>
      {partialCharge.map((charge, index: number) => (
        <QrCodeCharge
          key={charge.id}
          charge={charge}
          paymentNumber={index}
          hasDivider={index !== partialCharge.length - 1}
        />
      ))}
    </Layout>
  );
}

Charge.getInitialProps = async (ctx: any) => {
  const chargeId = ctx.query.charge;

  return { chargeId };
};
