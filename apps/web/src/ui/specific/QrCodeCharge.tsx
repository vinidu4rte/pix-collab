import { Box, Center, VStack, Divider } from "@chakra-ui/react";
import Image from "next/image";
import SubmitButton from "../generic/form/SubmitButton";
import Success from "../generic/svg/Success";
import PageTitle from "../generic/text/PageTitle";
import TextWithLabel from "../generic/text/TextWithLabel";
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import type { QrCodeChargeFragment$key } from "../../../__generated__/QrCodeChargeFragment.graphql";

const PARTIAL_CHARGE_FRAGMENT = graphql`
  fragment QrCodeChargeFragment on PartialCharge {
    id
    value
    status
    transactionId
    qrCode
  }
`;

const PAY_CHARGE_MUTATION = graphql`
  mutation QrCodeChargeMutation($data: FakeChargePaymentInput!) {
    fakeChargePayment(data: $data)
  }
`;

interface Props {
  charge: QrCodeChargeFragment$key;
  paymentNumber: number;
  hasDivider?: boolean;
}

export default function QrCodeCharge({
  charge,
  paymentNumber,
  hasDivider,
}: Props) {
  const { qrCode, status, transactionId, value } = useFragment(
    PARTIAL_CHARGE_FRAGMENT,
    charge
  );
  const [commitMutation, isMutationInFlight] = useMutation(PAY_CHARGE_MUTATION);

  const formattedValue = value / 100;
  const formattedCurrency = formattedValue.toLocaleString("pt-BR", {
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

  const onPayButtonClick = () => {
    commitMutation({
      variables: {
        data: {
          transactionId,
        },
      },
    });
  };

  return (
    <Box>
      <PageTitle fontSize={"24px"}>{textTitle}</PageTitle>
      <VStack>
        {status === "pending" && (
          <>
            <Box
              position="relative"
              borderWidth={4}
              borderColor="brand.primary"
              borderRadius={8}
              width={300}
              height={300}
              mb={4}
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
            <SubmitButton
              text="Simular pagamento"
              fontSize="12px"
              height={8}
              width={150}
              isDisabled={isMutationInFlight}
              isLoading={isMutationInFlight}
              borderRadius={0}
              onClick={onPayButtonClick}
            />
          </>
        )}
        {status === "paid" && (
          <Center py={8} height={300}>
            <Success />
          </Center>
        )}
        <TextWithLabel
          label="Identificador"
          content={transactionId}
          labelFontSize="20px"
          contentFontSize="16px"
          additionalStyles={{ paddingTop: 10 }}
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
