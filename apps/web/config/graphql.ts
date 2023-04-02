/* eslint-disable turbo/no-undeclared-env-vars */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const isBrowser = typeof window !== "undefined";

const httpLink = new HttpLink({
  uri: process.env.SERVER_HTTP_URL || "http://localhost:4000",
});

const wsLink = isBrowser
  ? new GraphQLWsLink(
      createClient({
        url: process.env.SERVER_WS_URL || "ws://localhost:4000",
      })
    )
  : null;

const splitLink =
  isBrowser && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
