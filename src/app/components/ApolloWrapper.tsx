"use client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import React, { PropsWithChildren } from "react";
import { MEDIA_QUERY } from "../graphql/queries";

function ApolloWrapper({ children }: PropsWithChildren) {
  const client = new ApolloClient({
    uri: "https://current--anilist-graph-2024.apollographos.net/graphql",
    cache: new InMemoryCache(),
  });
  client
    .query({
      query: MEDIA_QUERY,
      variables: {
        type: "ANIME",
        isAdult: false,
        perPage: 25,
      },
    })
    .then((result) => console.log("what happens", result));
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
