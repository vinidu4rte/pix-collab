import { useForm, SubmitHandler } from "react-hook-form";
import { VStack } from "@chakra-ui/react";

import Layout from "../ui/generic/Layout";
import PageTitle from "../ui/generic/text/PageTitle";
import CurrencyInput from "../ui/specific/CurrencyInput";
import SubmitButton from "../ui/generic/form/SubmitButton";
import SelectInput from "../ui/generic/form/SelectInput";
import Loading from "../ui/generic/form/Loading";
import { useRouter } from "next/router";
import { formatCurrency } from "../utils/formatCurrency";

type FormData = {
  totalValue: string;
  personsQuantity: string;
};

export default function Home() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      totalValue: "",
      personsQuantity: "2",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { totalValue, personsQuantity } = data;
    const totalValueNumber = Number(totalValue.replace(/[^0-9]/g, ""));

    if (!totalValueNumber) {
      setError("totalValue", {
        type: "manual",
        message: "É necessário inserir o valor total.",
      });
      return;
    }

    const minTotalValue = 100;
    const maxTotalValue = 1000000;

    if (totalValueNumber < minTotalValue || totalValueNumber > maxTotalValue) {
      setError("totalValue", {
        type: "manual",
        message: `O valor total deve ser entre ${formatCurrency(
          minTotalValue / 100
        )} e ${formatCurrency(maxTotalValue / 100)}.`,
      });
      return;
    }

    const personsQuantityNumber = Number(personsQuantity);
  };

  return (
    <Layout>
      <PageTitle fontSize={"24px"}>
        Dividir a conta entre <br />
        amigos nunca foi tão fácil!
      </PageTitle>
      <form
        style={{ width: "80%" }}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <VStack spacing={6}>
          <CurrencyInput
            id={"totalValue"}
            required={true}
            label={"Valor total (R$):"}
            placeholder={"R$ 100,00"}
            hookForm={register("totalValue", {
              required: "É necessário inserir o valor total.",
            })}
            errorMessage={errors.totalValue?.message}
          />
          <SelectInput
            id="personsQuantity"
            label="Quantidade de pessoas:"
            required={true}
            errorMessage={errors.personsQuantity?.message}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            hookForm={register("personsQuantity", {
              required: "É necessário inserir a quantidade de pessoas.",
            })}
          />
          <SubmitButton
            text={"Gerar cobranças"}
            isDisabled={!!errors.personsQuantity || !!errors.totalValue}
            fontSize={"18px"}
            height={"70px"}
            width={"100%"}
            borderRadius={8}
          />
        </VStack>
      </form>
    </Layout>
  );
}