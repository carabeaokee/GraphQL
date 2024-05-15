"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";
import ListCard from "@/components/ListCard";

export default function AnimeList() {
  const { loading, error, data } = useQuery(MEDIA_QUERY, {
    variables: {
      type: "ANIME",
      isAdult: false,
      perPage: 25,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.Page.media.map((media) => (
        <ListCard {...media} />
      ))}
    </div>
  );
}
