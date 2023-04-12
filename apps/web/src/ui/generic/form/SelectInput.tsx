import {
  FormControl,
  Select,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  id: string;
  required: boolean;
  label?: string;
  options: SelectOption[];
  errorMessage?: string;
  hookForm?: UseFormRegisterReturn<string>;
}

export default function SelectInput({
  id,
  required,
  options,
  label,
  errorMessage,
  hookForm,
}: Props) {
  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        color="brand.black"
        borderColor="brand.primary"
        _focus={{
          borderColor: "brand.primary",
        }}
        _hover={{
          borderColor: "brand.primary",
        }}
        {...hookForm}
      >
        {options.map((option: SelectOption) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
