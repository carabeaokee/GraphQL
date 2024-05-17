"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren, useState } from "react";
import { MEDIA_QUERY } from "../graphql/queries";
// import { Search } from "@/components/Search";
// import AnimeList from "@/app/animelist/page";

function ApolloWrapper({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState("");

  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
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
