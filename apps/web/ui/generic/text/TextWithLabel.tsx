import { Box, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  content: string | number;
  additionalStyles?: any;
}

export default function TextWithLabel({
  label,
  content,
  additionalStyles,
}: Props) {
  return (
    <Box m="0 !important" textAlign="center" style={{ ...additionalStyles }}>
      <Text fontWeight="bold" fontSize="20px">
        {label}
      </Text>
      <Text fontSize="16px">{content}</Text>
    </Box>
  );
}
