import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import RootLayout from "./layout";

const client = new ApolloClient({
  uri: "https://current--anilist-graph-2024.apollographos.net/graphql",
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <RootLayout>
      <App />
    </RootLayout>
  </ApolloProvider>
);
