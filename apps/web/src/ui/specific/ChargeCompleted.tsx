import { Center, VStack } from "@chakra-ui/react";
import Layout from "../generic/Layout";
import Success from "../generic/svg/Success";
import PageTitle from "../generic/text/PageTitle";
import TextWithLabel from "../generic/text/TextWithLabel";

interface Props {
  totalValue: number;
  receiverName: string;
  paymentId: string;
}

export default function ChargeCompleted({
  totalValue,
  receiverName,
  paymentId,
}: Props) {
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
