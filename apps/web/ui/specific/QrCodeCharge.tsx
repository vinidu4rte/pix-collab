import { Box, Center, VStack, Text, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Success from "../generic/svg/Success";
import PageTitle from "../generic/text/PageTitle";
import TextWithLabel from "../generic/text/TextWithLabel";

interface Props {
  id: string;
  value: number;
  status: "pending" | "paid";
  paymentNumber: number;
  qrCode: string;
  hasDivider?: boolean;
}

export default function QrCodeCharge({
  id,
  value,
  status,
  paymentNumber,
  qrCode,
  hasDivider,
}: Props) {
  const formattedCurrency = value.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const paymentTextIndexes = [
    "primeira",
    "segunda",
    "terceira",
    "quarta",
    "quinta",
    "sexta",
    "sétima",
    "oitava",
  ];

  const textTitle =
    status === "pending"
      ? `Pague ${formattedCurrency} para completar a ${paymentTextIndexes[paymentNumber]} parte do pagamento.`
      : `${paymentTextIndexes[
          paymentNumber
        ][0].toUpperCase()}${paymentTextIndexes[paymentNumber].substring(
          1
        )} parte do pagamento concluída.`;

  return (
    <Box>
      <PageTitle fontSize={"24px"}>{textTitle}</PageTitle>
      <VStack>
        {status === "pending" && (
          <Box
            position="relative"
            borderWidth={4}
            borderColor="brand.primary"
            borderRadius={8}
            width={300}
            height={300}
          >
            <Image
              src={qrCode}
              alt="Pix QR Code"
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              priority={true}
            />
          </Box>
        )}
        {status === "paid" && (
          <Center py={8} height={300}>
            <Success />
          </Center>
        )}
        <TextWithLabel
          label="Identificador"
          content={id}
          labelFontSize="20px"
          contentFontSize="16px"
          additionalStyles={{ paddingTop: 20 }}
        />
      </VStack>
      {hasDivider && (
        <Box pt={8}>
          <Divider variant="dashed" />
        </Box>
      )}
    </Box>
  );
}
