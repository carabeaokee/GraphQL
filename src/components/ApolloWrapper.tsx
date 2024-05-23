"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren, useState } from "react";
import { MEDIA_QUERY } from "../graphql/queries";

// ApolloWrapper component
function ApolloWrapper({ children }: PropsWithChildren) {
  // Creating a new Apollo Client
  const cache = new InMemoryCache({
    // Merging the incoming data with the existing data
    typePolicies: {
      Query: {
        fields: {
          Page: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
      Media: {
        fields: {
          title: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  });

  // Creating a new Apollo Client
  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    // Using the cache created above
    cache,
  });
  // Fetching the media data
  client.query({
    query: MEDIA_QUERY,
    variables: {
      type: "ANIME",
      isAdult: false,
      perPage: 25,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
