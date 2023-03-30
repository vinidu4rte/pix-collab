import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { customizedTheme } from "../theme";
import Head from "next/head";
import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "../relay/RelayEnvironment";

function App({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ChakraProvider theme={customizedTheme}>
        <Head>
          <title>PixCollab - Woovi</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
