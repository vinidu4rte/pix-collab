import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  Observable,
  SubscribeFunction,
} from "relay-runtime";
import { createClient } from "graphql-ws";

const isBrowser = typeof window !== "undefined";
const HTTP_ENDPOINT = "https://woovi-challenge-server.onrender.com";
const wsClient = isBrowser
  ? createClient({
      url: "wss://woovi-challenge-server.onrender.com",
    })
  : null;

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await resp.json();
};

const subscribeFn: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    if (!operation.text)
      return sink.error(new Error("Operation text cannot be empty"));

    return wsClient?.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      // @ts-ignore
      {
        ...sink,
        error: (err) => {
          if (Array.isArray(err))
            return sink.error(
              new Error(err.map(({ message }) => message).join(", "))
            ); // GraphQLError[]

          return sink.error(err as Error);
        },
      }
    );
  });
};

export const environment = new Environment({
  network: wsClient
    ? Network.create(fetchFn, subscribeFn)
    : Network.create(fetchFn),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10,
  }),
});
