import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { customizedTheme } from "../theme";
import Head from "next/head";
import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../relay/RelayEnvironment";

function App({ Component, pageProps }: AppProps) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <ChakraProvider theme={customizedTheme}>
        <Head>
          <title>PixCollab - Woovi</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReactRelayContext.Provider>
  );
}

export default App;
