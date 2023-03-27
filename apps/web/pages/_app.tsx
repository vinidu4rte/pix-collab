import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { customizedTheme } from "../theme";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { client } from "../config/graphql";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customizedTheme}>
      <Head>
        <title>PixCollab - Woovi</title>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
