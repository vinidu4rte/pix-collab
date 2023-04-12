import { Center, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../generic/Layout";

export default function Error() {
  return (
    <Layout enablesHomeRedirect>
      <Center pt={12} flexDirection="column">
        <Heading as={"h1"}>Ops, algo deu errado!</Heading>
        <Heading size="md" pt={4} as={"h2"}>
          Tente novamente mais tarde.
        </Heading>
        <Heading size="md" pt={4} as={"h2"}>
          Se o problema persistir, entre em contato {""}
          <Link
            href="https://github.com/vinidu4rte/pix-collab/issues"
            target={"_blank"}
          >
            AQUI
          </Link>
          .
        </Heading>
      </Center>
    </Layout>
  );
}
