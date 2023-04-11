/* eslint-disable turbo/no-undeclared-env-vars */
import { createClient } from "graphql-ws";
import { useMemo } from "react";
import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
  SubscribeFunction,
} from "relay-runtime";
import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";

let relayEnvironment: Environment;

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

const isBrowser = typeof window !== "undefined";
const HTTP_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_HTTP_URL || "http://localhost:4000";
const WS_ENDPOINT =
  process.env.NEXT_PUBLIC_SERVER_WS_URL || "ws://localhost:4000";

const wsClient = isBrowser
  ? createClient({
      url: WS_ENDPOINT,
    })
  : null;

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
            );

          return sink.error(err as Error);
        },
      }
    );
  });
};

function createEnvironment(initialRecords: RecordMap | undefined) {
  return new Environment({
    network: wsClient
      ? Network.create(fetchFn, subscribeFn)
      : Network.create(fetchFn),
    store: new Store(new RecordSource(), {
      gcReleaseBufferSize: 10,
    }),
  });
}

export function initEnvironment(initialRecords: RecordMap | undefined) {
  const environment = relayEnvironment ?? createEnvironment(initialRecords);

  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }

  // For SSG and SSR always create a new Relay environment
  if (!isBrowser) return environment;

  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment(initialRecords: any) {
  const store = useMemo(
    () => initEnvironment(initialRecords),
    [initialRecords]
  );
  return store;
}
