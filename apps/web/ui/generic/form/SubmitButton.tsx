import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  width: string | number;
  height: string | number;
  fontSize: string | number;
  borderRadius: string | number;
}

export default function SubmitButton({
  text,
  onClick,
  isDisabled,
  isLoading,
  width,
  height,
  fontSize,
  borderRadius,
}: Props) {
  return (
    <Button
      type="submit"
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      bgColor="brand.primary"
      color={"brand.white"}
      width={width}
      fontSize={fontSize}
      fontWeight={"800"}
      height={height}
      _hover={{
        bgColor: "#02956d",
      }}
      borderRadius={borderRadius}
    >
      {text}
    </Button>
  );
}
