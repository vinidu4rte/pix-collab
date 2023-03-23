import { Heading } from "@chakra-ui/react";

interface Props {
  children: any;
  fontSize: string | string[];
}

export default function PageTitle({ children, fontSize }: Props) {
  return (
    <Heading textAlign="center" as="h1" py={8} fontSize={fontSize}>
      {children}
    </Heading>
  );
}
