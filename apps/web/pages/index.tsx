import { useForm, SubmitHandler } from "react-hook-form";
import { VStack } from "@chakra-ui/react";

import Layout from "../ui/generic/Layout";
import PageTitle from "../ui/generic/text/PageTitle";
import TextInput from "../ui/generic/form/TextInput";
import SubmitButton from "../ui/generic/form/SubmitButton";
import SelectInput from "../ui/generic/form/SelectInput";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";
import Loading from "../ui/generic/form/Loading";

type FormData = {
  totalValue: string;
  personsQuantity: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

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

    const totalValueNumber = Number(totalValue.replace(/[^0-9]/g, "")) / 100;
    if (!totalValueNumber) {
      setError("totalValue", {
        type: "manual",
        message: "É necessário inserir o valor total.",
      });
      return;
    }

    const personsQuantityNumber = Number(personsQuantity);
    console.log(totalValueNumber, personsQuantityNumber);
    setIsLoading(true);
  };

  if (isLoading) {
    return <Loading />;
  }

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
          <TextInput
            id={"totalValue"}
            required={true}
            label={"Valor total (R$):"}
            placeholder={"R$ 100,00"}
            hookForm={register("totalValue", {
              required: "É necessário inserir o valor total.",

              onChange(event) {
                const { value } = event.target;
                event.target.value = formatCurrency(value);
              },
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
              { value: "5", label: "5" },
              { value: "6", label: "6" },
              { value: "7", label: "7" },
              { value: "8", label: "8" },
            ]}
            hookForm={register("personsQuantity", {
              required: "É necessário inserir a quantidade de pessoas.",
            })}
          />
          <SubmitButton
            text={"Gerar cobranças"}
            isDisabled={!!errors.personsQuantity || !!errors.totalValue}
          />
        </VStack>
      </form>
    </Layout>
  );
}
