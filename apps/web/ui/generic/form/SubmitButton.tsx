import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export default function SubmitButton({
  text,
  onClick,
  isDisabled,
  isLoading,
}: Props) {
  return (
    <Button
      type="submit"
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      bgColor="brand.primary"
      color={"brand.white"}
      width="100%"
      fontSize={"18px"}
      fontWeight={"800"}
      height={"70px"}
      _hover={{
        bgColor: "#02956d",
      }}
    >
      {text}
    </Button>
  );
}
