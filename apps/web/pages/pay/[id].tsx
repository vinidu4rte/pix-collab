import { ApolloQueryResult, gql, useSubscription } from "@apollo/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { client } from "../../config/graphql";
import { useRouter } from "next/router";
import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";
import { useEffect, useState } from "react";

const GET_CHARGE = gql`
  query Charge($chargeId: String!) {
    charge(id: $chargeId) {
      id
      status
      collaboratorsQuantity
      value
      partialCharge {
        id
        correlationId
        transactionId
        status
        value
        qrCode
      }
    }
  }
`;

const CHARGE_SUBSCRIPTION = gql`
  subscription NewNotification($chargeId: String!) {
    newNotification(chargeId: $chargeId) {
      id
      status
      collaboratorsQuantity
      value
      partialCharge {
        id
        correlationId
        transactionId
        status
        value
        qrCode
      }
    }
  }
`;

interface PartialCharge {
  id: string;
  status: "pending" | "paid";
  transactionId: string;
  qrCode: string;
  value: number;
}

interface ChargeData {
  id: string;
  status: "pending" | "paid";
  collaboratorsQuantity: number;
  value: number;
  partialCharge: PartialCharge[];
}

interface ChargeQuery {
  charge: ChargeData;
}

interface ChargeSubscription {
  newNotification: ChargeData;
}

export const getServerSideProps: GetServerSideProps<{
  charge: ChargeData;
}> = async (context) => {
  const chargeId = context.query.id;

  try {
    const { data, error, errors } = await client.query<ChargeQuery>({
      query: GET_CHARGE,
      variables: { chargeId: chargeId },
      fetchPolicy: "network-only",
    });

    if (!data || error || errors) {
      return {
        notFound: true,
      };
    }

    const charge = data.charge;

    return {
      props: {
        charge,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default function Charge({
  charge,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [chargeData, setChargeData] = useState<ChargeData>(charge);

  const { data } = useSubscription<ChargeSubscription>(CHARGE_SUBSCRIPTION, {
    variables: { chargeId: charge.id },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (!data || !data.newNotification) return;

    const charge = data.newNotification;

    setChargeData(charge);
  }, [data]);

  const { id, status, value, partialCharge } = chargeData;

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
      {partialCharge.map((charge: PartialCharge, index: number) => (
        <QrCodeCharge
          key={charge.id}
          id={charge.transactionId}
          status={charge.status}
          value={charge.value / 100}
          paymentNumber={index}
          qrCode={charge.qrCode}
          hasDivider={index !== partialCharge.length - 1}
        />
      ))}
    </Layout>
  );
}
