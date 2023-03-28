import { gql, useQuery, useSubscription } from "@apollo/client";
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

export default function Charge() {
  const router = useRouter();
  const chargeId = router.query.id;

  const { data, loading, error, subscribeToMore } = useQuery<{
    newNotification: ChargeData;
    charge: ChargeData;
  }>(GET_CHARGE, {
    variables: { chargeId },
  });

  subscribeToMore({
    document: CHARGE_SUBSCRIPTION,
    variables: { chargeId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newCharge = subscriptionData.data.newNotification;
      return Object.assign({}, prev, {
        charge: newCharge,
      });
    },
  });

  if (loading) {
    return <div></div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  const { charge } = data;
  const { id, status, value, partialCharge } = charge;

  if (status === "paid") {
    return (
      <ChargeCompleted
        paymentId={id}
        receiverName="VD Consultoria"
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
