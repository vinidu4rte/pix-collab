import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";
import { useSubscription, fetchQuery } from "react-relay";
import { graphql, GraphQLSubscriptionConfig } from "relay-runtime";
import type { ChargeSubscription as ChargeSubscriptionType } from "../../../__generated__/ChargeSubscription.graphql";
import { useMemo, useState } from "react";
import { initEnvironment } from "../../relay/RelayEnvironment";

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

export async function getServerSideProps(ctx: any) {
  const chargeId = ctx.query.charge;
  const environment = initEnvironment(undefined);
  const queryProps = await fetchQuery(
    environment,
    GET_CHARGE,
    {
      chargeId,
    },
    {
      fetchPolicy: "network-only",
    }
  ).toPromise();

  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      queryProps,
      initialRecords,
    },
  };
}

export default function Charge({ queryProps }: any) {
  const { charge } = queryProps;
  const [chargeData, setChargeData] = useState(charge);
  const { id, status, value, partialCharge } = chargeData;

  const config = useMemo<GraphQLSubscriptionConfig<ChargeSubscriptionType>>(
    () => ({
      variables: {
        chargeId: id,
      },
      subscription: CHARGE_SUBSCRIPTION,
      updater: (_, data) => {
        const newNotification = data.newNotification;
        setChargeData(newNotification);
      },
    }),
    [id]
  );

  useSubscription<ChargeSubscriptionType>(config);

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
      {partialCharge.map((charge: any, index: number) => (
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
