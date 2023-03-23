import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { customizedTheme } from "../theme";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customizedTheme}>
      <Head>
        <title>PixCollab - Woovi</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
