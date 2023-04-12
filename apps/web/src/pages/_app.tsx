import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { customizedTheme } from "../theme";
import Head from "next/head";
import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../relay/RelayEnvironment";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../ui/specific/Error";

function App({ Component, pageProps }: AppProps) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <ChakraProvider theme={customizedTheme}>
        <Head>
          <title>PixCollab - Woovi</title>
        </Head>
        <ErrorBoundary fallbackRender={Error}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ChakraProvider>
    </ReactRelayContext.Provider>
  );
}

export default App;
