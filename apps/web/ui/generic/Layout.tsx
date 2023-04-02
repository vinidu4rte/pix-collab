import { Container } from "@chakra-ui/react";
import Link from "next/link";
import WooviLogo from "./svg/WooviLogo";

interface Props {
  children: React.ReactNode;
  enablesHomeRedirect?: boolean;
}

export default function Layout({ children, enablesHomeRedirect }: Props) {
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
      {enablesHomeRedirect ? (
        <Link href="/">
          <WooviLogo />
        </Link>
      ) : (
        <WooviLogo />
      )}
      {children}
    </Container>
  );
}
