"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
export const MEDIA_QUERY = gql`
  query Media($type: MediaType, $isAdult: Boolean, $perPage: Int) {
    Page(perPage: $perPage) {
      media(type: $type, isAdult: $isAdult) {
        id
        seasonYear
        coverImage {
          medium
        }
        meanScore
        averageScore
        popularity
        title {
          english
        }
      }
    }
  }
`;
function MediaList() {
  const { loading, error, data } = useQuery(MEDIA_QUERY, {
    variables: {
      type: "ANIME",
      isAdult: false,
      perPage: 25,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.Page.media.map(({ id, title, coverImage, seasonYear }) => (
    <div key={id} class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={coverImage.medium} alt={title.english} />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title.english}</div>
        <p class="text-gray-700 text-base">Season Year: {seasonYear}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #anime
        </span>
      </div>
    </div>
  ));
}

export default MediaList;
