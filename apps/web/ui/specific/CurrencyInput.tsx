import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { formatCurrency } from "../../utils/formatCurrency";

interface Props {
  id: string;
  required: boolean;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  hookForm?: UseFormRegisterReturn<string>;
}

export default function CurrencyInput({
  id,
  required,
  label,
  placeholder,
  errorMessage,
  hookForm,
}: Props) {
  return (
    <FormControl isInvalid={!!errorMessage} isRequired={required}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <NumberInput
        min={100}
        max={1000000}
        clampValueOnBlur={false}
        isValidCharacter={(char) => {
          return "R$0123456789,".includes(char);
        }}
        format={(value) => {
          const valueInReal = Number(value) / 100;
          return formatCurrency(valueInReal);
        }}
        parse={(value) => {
          return value.replace(/[^0-9]/g, "");
        }}
      >
        <NumberInputField
          pattern=".*"
          id={id}
          placeholder={placeholder}
          color="brand.black"
          borderColor="brand.primary"
          _focus={{
            borderColor: "brand.primary",
          }}
          _hover={{
            borderColor: "brand.primary",
          }}
          {...hookForm}
        />
      </NumberInput>
      <FormErrorMessage>{errorMessage ? errorMessage : ""}</FormErrorMessage>
    </FormControl>
  );
}
