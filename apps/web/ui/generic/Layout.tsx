import { Container } from "@chakra-ui/react";
import WooviLogo from "./svg/WooviLogo";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container
      my={8}
      borderColor="blackAlpha.300"
      borderWidth={0}
      borderRadius={8}
      p={8}
      centerContent
      minHeight={"80vh"}
    >
      <WooviLogo />
      {children}
    </Container>
  );
}
