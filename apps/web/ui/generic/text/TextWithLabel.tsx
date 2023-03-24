import { Box, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  content: string | number;
  labelFontSize: string;
  contentFontSize: string;
  additionalStyles?: any;
}

export default function TextWithLabel({
  label,
  content,
  labelFontSize,
  contentFontSize,
  additionalStyles,
}: Props) {
  return (
    <Box textAlign="center" style={{ ...additionalStyles }}>
      <Text fontWeight="bold" fontSize={labelFontSize}>
        {label}
      </Text>
      <Text fontSize={contentFontSize}>{content}</Text>
    </Box>
  );
}
