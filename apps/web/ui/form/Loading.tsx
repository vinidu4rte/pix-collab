import { Flex, Spacer, Container, Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import Layout from "../Layout";
import PageTitle from "../text/PageTitle";

const loadingTexts = [
  "Dividindo a conta...",
  "Conectando ao banco...",
  "Gerando QR Code...",
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index: number) => index + 1),
      2000
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Layout>
      <Flex width="80%" grow={1} direction="column" justify={"space-between"}>
        <Spacer />
        <Container mb={20}>
          <TextTransition springConfig={presets.gentle}>
            <PageTitle fontSize="24px">
              {loadingTexts[index % loadingTexts.length]}
            </PageTitle>
          </TextTransition>
          <Progress isIndeterminate colorScheme={"defaultBrandTheme"} />
        </Container>
        <Spacer />
      </Flex>
    </Layout>
  );
}
