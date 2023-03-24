import Layout from "../ui/generic/Layout";
import QrCodeCharge from "../ui/specific/QrCodeCharge";

interface ChargeData {
  id: string;
  status: "waiting" | "paid";
  value: number;
  qrCode: string;
}

const mockedData: ChargeData[] = [
  {
    id: "fc571b347d814503aedc9300aca3a04z",
    status: "waiting",
    value: 100,
    qrCode:
      "https://api.openpix.com.br/openpix/charge/brcode/image/e1367104-85c0-4a2e-ba99-918501eb24d0.png",
  },
  {
    id: "ab571b347d814503aedc9300aca359s",
    status: "paid",
    value: 100,
    qrCode:
      "https://api.openpix.com.br/openpix/charge/brcode/image/e1367104-85c0-4a2e-ba99-918501eb24d0.png",
  },
  {
    id: "or571b347d814503aedc9300aca3a13a",
    status: "waiting",
    value: 100,
    qrCode:
      "https://api.openpix.com.br/openpix/charge/brcode/image/e1367104-85c0-4a2e-ba99-918501eb24d0.png",
  },
];

export default function Charge() {
  return (
    <Layout>
      {mockedData.map((charge, index) => (
        <QrCodeCharge
          key={charge.id}
          id={charge.id}
          status={charge.status}
          value={charge.value}
          paymentNumber={index}
          qrCode={charge.qrCode}
          hasDivider={index !== mockedData.length - 1}
        />
      ))}
    </Layout>
  );
}
