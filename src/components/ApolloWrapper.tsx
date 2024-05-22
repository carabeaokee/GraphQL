"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren, useState } from "react";
import { MEDIA_QUERY } from "../graphql/queries";
// import { Search } from "@/components/Search";
// import AnimeList from "@/app/animelist/page";

function ApolloWrapper({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState("");

  const cache = new InMemoryCache({
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

  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache,
  });
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
