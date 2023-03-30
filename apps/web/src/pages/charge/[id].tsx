import Layout from "../../ui/generic/Layout";
import ChargeCompleted from "../../ui/specific/ChargeCompleted";
import QrCodeCharge from "../../ui/specific/QrCodeCharge";

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

export default function Charge({ chargeId }: any) {
  const mockedCharge: ChargeData = {
    id: "123",
    status: "paid",
    value: 1000,
    collaboratorsQuantity: 2,
    partialCharge: [
      {
        id: "123",
        status: "paid",
        transactionId: "123",
        qrCode: "123",
        value: 500,
      },
      {
        id: "123",
        status: "paid",
        transactionId: "123",
        qrCode: "123",
        value: 500,
      },
    ],
  };
  const { id, status, value, partialCharge } = mockedCharge;

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

Charge.getInitialProps = async (ctx: any) => {
  const chargeId = ctx.query.id;

  return { chargeId };
};
