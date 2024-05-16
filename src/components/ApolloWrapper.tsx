// "use client";
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import React, { PropsWithChildren } from "react";
// import { MEDIA_QUERY } from "../graphql/queries";
// import { useState } from "react";
// import AnimeList from "@/app/animelist/page";

// function ApolloWrapper({ children }: PropsWithChildren) {
//   const [count, setCount] = useState(1); // Sets the page count
//   const [query, setQuery] = useState(null); // Sets the search query
//   const client = new ApolloClient({
//     uri: "https://graphql.anilist.co",
//     cache: new InMemoryCache(),
//   });
//   client
//     .query({
//       query: MEDIA_QUERY,
//       variables: {
//         type: "ANIME",
//         isAdult: false,
//         perPage: 25,
//       },
//     })
//     .then((result) => console.log("what happens", result));

//   function setCountFromInput(e) {
//     e.target.value === "" || e.target.value < 1
//       ? setCount(1)
//       : setCount(parseInt(e.target.value));
//   }

//   /**
//    * Sets the search query with error handling
//    */
//   function checkSetQuery(e) {
//     e.target.value == "" || e.target.value == null
//       ? setQuery(null)
//       : (setQuery(e.target.value), setCount(1));
//   }

//   return (
//     <>
//       <div>
//         <input
//           className="searchBar"
//           placeholder="Search here..."
//           onChange={checkSetQuery}
//         />
//       </div>
//       <div className="pagingRow">
//         <button
//           className="back"
//           onClick={() => (count > 1 ? setCount(count - 1) : setCount(count))}
//         >
//           Back
//         </button>
//         <button className="next" onClick={() => setCount(count + 1)}>
//           Next
//         </button>
//         <span>
//           <span className="showPage">Page {count}</span>
//           <input
//             className="pageInput"
//             type="number"
//             onChange={(e) => setCountFromInput(e)}
//             min="1"
//             placeholder="jump to page..."
//             onFocus={(e) => (e.target.value = "")}
//           />
//         </span>
//       </div>
//       <br />
//       <div>
//         <ApolloProvider client={client}>
//           {children}
//           <AnimeList page={count} search={query} />
//         </ApolloProvider>
//       </div>
//     </>
//   );
// }

// export default ApolloWrapper;

"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren } from "react";
import { MEDIA_QUERY } from "../graphql/queries";

function ApolloWrapper({ children }: PropsWithChildren) {
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
