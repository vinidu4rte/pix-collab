import { Box, Center, VStack, Text, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Success from "../generic/svg/Success";
import PageTitle from "../generic/text/PageTitle";

interface Props {
  id: string;
  value: number;
  status: "waiting" | "paid";
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
    status === "waiting"
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
        {status === "waiting" && (
          <Box
            position="relative"
            borderWidth={4}
            borderColor="brand.primary"
            borderRadius={8}
            width={300}
            height={300}
          >
            <Image src={qrCode} alt="Pix QR Code" fill />
          </Box>
        )}
        {status === "paid" && (
          <Center py={8}>
            <Success />
          </Center>
        )}
        <Box pt={"4"} m="0 !important" textAlign="center">
          <Text fontWeight="bold" fontSize="20px">
            Identificador
          </Text>
          <Text fontSize="16px">{id}</Text>
        </Box>
      </VStack>
      {hasDivider && (
        <Box pt={8}>
          <Divider />
        </Box>
      )}
    </Box>
  );
}