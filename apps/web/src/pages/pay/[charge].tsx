import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import type { ChargeQuery as ChargeQueryType } from "../../../__generated__/ChargeQuery.graphql";

const GET_CHARGE = graphql`
  query ChargeQuery($chargeId: String!) {
    charge(id: $chargeId) {
      id
      globalId
      status
      value
      partialCharge {
        value
        transactionId
        status
        qrCode
        id
      }
    }
  }
`;

export default function Charge({ chargeId }: { chargeId: string }) {
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

Charge.getInitialProps = async (ctx: any) => {
  const chargeId = ctx.query.charge;

  return { chargeId };
};
