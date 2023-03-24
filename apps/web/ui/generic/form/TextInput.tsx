import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  required: boolean;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  hookForm?: UseFormRegisterReturn<string>;
}

export default function TextInput({
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
      <Input
        type={"text"}
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
      <FormErrorMessage>{errorMessage ? errorMessage : ""}</FormErrorMessage>
    </FormControl>
  );
}
