"use client";
// import React from "react";
import { gql } from "@apollo/client";

export const MEDIA_QUERY = gql`
  query Media($type: MediaType, $isAdult: Boolean, $perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: $type, isAdult: $isAdult) {
        id
        seasonYear
        coverImage {
          large
        }
        meanScore
        averageScore
        popularity
        genres
        title {
          english
          romaji
        }
      }
    }
  }
`;
export const MEDIA_DETAILS_QUERY = gql`
  query Query($mediaId: Int) {
    Media(id: $mediaId) {
      id
      title {
        english
        romaji
        native
      }
      meanScore
      averageScore
      popularity
      genres
      seasonYear
      format
      status
      description
      startDate {
        year
      }
      endDate {
        year
      }
      episodes
      duration
      coverImage {
        large
      }
      bannerImage
      genres
      isFavourite
    }
  }
`;

// function MediaList() {
//   const { loading, error, data } = useQuery(MEDIA_QUERY, {
//     variables: {
//       type: "ANIME",
//       isAdult: false,
//       perPage: 25,
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return (
//     <div className="grid grid-cols-5 gap-4">
//       {data.Page.media.map(({ genres, id, title, coverImage, seasonYear }) => (
//         <div key={id} className="max-w-sm rounded overflow-hidden shadow-lg">
//           <Link href={`/details/${id}`}>
//             <img
//               className="w-full"
//               src={coverImage.large}
//               alt={title.english}
//             />
//           </Link>
//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">{title.english}</div>
//             <p className="text-gray-700 text-base">Season Year: {seasonYear}</p>
//           </div>
//           <div className="px-6 pt-4 pb-2">
//             {genres.map((genre, index) => (
//               <span
//                 key={index}
//                 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
//               >
//                 {genre}
//               </span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MediaList;
