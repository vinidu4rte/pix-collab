import { Center, VStack } from "@chakra-ui/react";
import Layout from "../ui/generic/Layout";
import Success from "../ui/generic/svg/Success";
import PageTitle from "../ui/generic/text/PageTitle";
import TextWithLabel from "../ui/generic/text/TextWithLabel";

interface Props {
  totalValue: number;
  receiverName: string;
  paymentId: string;
}

export default function Feedback({
  totalValue,
  receiverName,
  paymentId,
}: Props) {
  const mockedData: Props = {
    totalValue: 100,
    receiverName: "VD Consultoria",
    paymentId: "fc571b347d814503aedc9300aca3a04z",
  };

  totalValue = mockedData.totalValue;
  receiverName = mockedData.receiverName;
  paymentId = mockedData.paymentId;

  const formattedTotalValue = totalValue.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const fontSizeTextWithLabel = {
    labelFontSize: "22px",
    contentFontSize: "18px",
  };

  return (
    <Layout>
      <Center pt={12} flexDirection="column">
        <Success />
        <PageTitle fontSize="32px">Pagamento confirmado</PageTitle>
        <VStack spacing={6}>
          <TextWithLabel
            label="Valor pago"
            content={formattedTotalValue}
            {...fontSizeTextWithLabel}
          />
          <TextWithLabel
            label="Destinatário"
            content={receiverName}
            {...fontSizeTextWithLabel}
          />
          <TextWithLabel
            label="Identificador"
            content={paymentId}
            {...fontSizeTextWithLabel}
          />
        </VStack>
      </Center>
    </Layout>
  );
}
