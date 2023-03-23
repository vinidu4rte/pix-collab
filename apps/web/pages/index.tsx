import { useForm, SubmitHandler } from "react-hook-form";
import { VStack } from "@chakra-ui/react";

import Layout from "../ui/Layout";
import PageTitle from "../ui/text/PageTitle";
import TextInput from "../ui/form/TextInput";
import SubmitButton from "../ui/form/SubmitButton";
import SelectInput from "../ui/form/SelectInput";

type FormData = {
  totalValue: string;
  personsQuantity: number;
};

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      totalValue: "",
      personsQuantity: 2,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <PageTitle fontSize={"24px"}>
        Dividir a conta entre <br />
        amigos nunca foi tão fácil!
      </PageTitle>
      <form style={{ width: "80%" }} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <TextInput
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
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
              { value: 6, label: "6" },
              { value: 7, label: "7" },
              { value: 8, label: "8" },
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
