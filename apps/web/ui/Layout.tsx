import { Container } from "@chakra-ui/react";
import WooviLogo from "../ui/svg/WooviLogo";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container
      mt={8}
      borderColor="blackAlpha.300"
      borderWidth={1}
      borderRadius={8}
      p={8}
      centerContent
    >
      <WooviLogo />
      {children}
    </Container>
  );
}
