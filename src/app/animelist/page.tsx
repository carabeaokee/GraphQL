"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";
import ListCard from "@/components/ListCard";
import { useState } from "react";

export default function AnimeList() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(MEDIA_QUERY, {
    variables: {
      page,
      type: "ANIME",
      isAdult: false,
      perPage: 25,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const totalPages = Math.ceil(
    data.Page.pageInfo.total / data.Page.pageInfo.perPage
  );

  // Calculate page numbers to display
  let startPage = Math.max(page - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);
  startPage = Math.max(endPage - 4, 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  interface Media {
    id: string;
    title: {
      english: string;
      romaji: string;
    };
    coverImage: {
      large: string;
    };
    seasonYear: number;
    genres: string[];
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {data.Page.media.map((media: Media) => (
          <ListCard {...media} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            Previous
          </button>
        )}
        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
                page === pageNumber ? "bg-gray-900 text-white" : "text-gray-900"
              } transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {pageNumber}
              </span>
            </button>
          ))}
        </div>
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        )}
      </div>
      <p>
        Page {page} of {totalPages}
      </p>
    </>
  );
}

// "use client";
// import React, { Suspense } from "react";
// import { useQuery } from "@apollo/client";
// import { MEDIA_QUERY } from "@/graphql/queries";
// import ListCard from "@/components/ListCard";
// import { useState } from "react";
// import Home from "../page";
// // import { useRouter } from "next/navigation";

// export default function AnimeList({ searchTerm }) {
//   //   searchParams,
//   // }: {
//   //   searchParams?: {
//   //     query?: string;
//   //     page?: string;
//   //   };
//   // }) {
//   // const searchTerm = searchParams?.query || "";
//   // const currentPage = Number(searchParams?.page) || 1;
//   const [page, setPage] = useState(currentPage);
//   const { loading, error, data } = useQuery(MEDIA_QUERY, {
//     variables: {
//       page,
//       type: "ANIME",
//       isAdult: false,
//       perPage: 25,
//       search: searchTerm,
//     },
//     skip: !searchTerm,
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   if (data && data.Page) {
//     const totalPages = Math.ceil(
//       data.Page.pageInfo.total / data.Page.pageInfo.perPage
//     );

//     // Calculate page numbers to display
//     let startPage = Math.max(page - 2, 1);
//     let endPage = Math.min(startPage + 4, totalPages);
//     startPage = Math.max(endPage - 4, 1);
//     const pageNumbers = Array.from(
//       { length: endPage - startPage + 1 },
//       (_, i) => startPage + i
//     );

//     interface Media {
//       id: string;
//       title: {
//         english: string;
//         romaji: string;
//       };
//       coverImage: {
//         large: string;
//       };
//       seasonYear: number;
//       genres: string[];
//     }

//     return (
//       <>
//         <div className="grid grid-cols-5 gap-4">
//           {data.Page.media.map((media: Media) => (
//             <ListCard {...media} />
//           ))}
//         </div>
//         <div>
//           <Suspense
//             key={searchTerm + currentPage}
//             fallback={<Home />}
//           ></Suspense>
//         </div>
//         <div className="flex items-center gap-4">
//           {page > 1 && (
//             <button
//               onClick={() => setPage(page - 1)}
//               className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="2"
//                 stroke="currentColor"
//                 aria-hidden="true"
//                 className="w-4 h-4"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//                 ></path>
//               </svg>
//               Previous
//             </button>
//           )}
//           <div className="flex items-center gap-2">
//             {pageNumbers.map((pageNumber) => (
//               <button
//                 key={pageNumber}
//                 onClick={() => setPage(pageNumber)}
//                 className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
//                   page === pageNumber
//                     ? "bg-gray-900 text-white"
//                     : "text-gray-900"
//                 } transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
//                 type="button"
//               >
//                 <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                   {pageNumber}
//                 </span>
//               </button>
//             ))}
//           </div>
//           {page < totalPages && (
//             <button
//               onClick={() => setPage(page + 1)}
//               className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button"
//             >
//               Next
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="2"
//                 stroke="currentColor"
//                 aria-hidden="true"
//                 className="w-4 h-4"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//                 ></path>
//               </svg>
//             </button>
//           )}
//         </div>
//         <p>
//           Page {page} of {totalPages}
//         </p>
//       </>
//     );
//   }
// }
