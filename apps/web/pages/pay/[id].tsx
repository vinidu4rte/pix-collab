import { ApolloQueryResult, gql } from "@apollo/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { client } from "../../config/graphql";
import { useRouter } from "next/router";
import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";

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

export const getServerSideProps: GetServerSideProps<{
  charge: ChargeData;
}> = async (context) => {
  const chargeId = context.query.id;

  try {
    const { data, error, errors } = await client.query({
      query: GET_CHARGE,
      variables: { chargeId: chargeId },
      fetchPolicy: "network-only",
    });

    if (!data || error || errors) {
      return {
        notFound: true,
      };
    }

    const charge: ChargeData = data.charge;

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
  // subscribeToMore({
  //   document: CHARGE_SUBSCRIPTION,
  //   variables: { chargeId: chargeId },
  //   updateQuery: (prev: any, { subscriptionData }: any) => {
  //     if (!subscriptionData.data) return prev;
  //     const newCharge = subscriptionData.data.newNotification;
  //     return Object.assign({}, prev, {
  //       charge: newCharge,
  //     });
  //   },
  // });

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
