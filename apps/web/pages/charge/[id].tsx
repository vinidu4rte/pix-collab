import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";

const GET_CHARGE = gql`
  query Charge($chargeId: String!) {
    charge(id: $chargeId) {
      id
      status
      value
      collaboratorsQuantity
      partialCharge {
        id
        transactionId
        qrCode
        status
        value
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

  const { data, loading, error } = useQuery<{ charge: ChargeData }>(
    GET_CHARGE,
    {
      variables: {
        chargeId: chargeId,
      },
    }
  );

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
