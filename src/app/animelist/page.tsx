"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";
import ListCard from "@/components/ListCard";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import SelectGenre from "@/components/SelectGenre";
import Sort from "@/components/Sort";

export default function AnimeList() {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string[]>(["POPULARITY_DESC"]);
  const { loading, error, data, refetch } = useQuery(MEDIA_QUERY, {
    variables: {
      page,
      type: "ANIME",
      isAdult: false,
      perPage: 25,
      sort: sortOrder,
      genre_in: selectedGenres,
    },
  });

  const handleGenreChange = (newGenres: string[]) => {
    setSelectedGenres(newGenres);
    refetch({
      page,
      type: "ANIME",
      isAdult: false,
      perPage: 25,
      sort: sortOrder,
      genre_in: newGenres,
    });
  };

  const handleSortChange = (newSortOrder: string[]) => {
    setSortOrder(newSortOrder);
    refetch({
      page,
      type: "ANIME",
      isAdult: false,
      perPage: 25,
      sort: newSortOrder,
      genre_in: selectedGenres,
    });
  };

  let sortedMedia: Media[] = [];

  if (!loading && !error && data) {
    sortedMedia = [...data.Page.media].sort((a: Media, b: Media) => {
      switch (sortOrder[0]) {
        case "title-asc":
          return (a.title.english || a.title.romaji).localeCompare(
            b.title.english || b.title.romaji
          );
        case "title-desc":
          return (b.title.english || b.title.romaji).localeCompare(
            a.title.english || a.title.romaji
          );
        case "popularity-asc":
          return a.popularity - b.popularity;
        case "popularity-desc":
          return b.popularity - a.popularity;
        case "averageScore-asc":
          return a.averageScore - b.averageScore;
        case "averageScore-desc":
          return b.averageScore - a.averageScore;
        case "year-asc":
          return a.seasonYear - b.seasonYear;
        case "year-desc":
          return b.seasonYear - a.seasonYear;
        default:
          return 0;
      }
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Calculate total pages
  const totalPages = Math.ceil(
    data.Page.pageInfo.total / data.Page.pageInfo.perPage
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
    popularity: number;
    averageScore: number;
    genres: string[];
  }

  return (
    <>
      <div>
        <SelectGenre
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />
      </div>
      <div>
        <Sort onSortChange={handleSortChange} />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {sortedMedia
          .filter(
            (media: Media) =>
              selectedGenres.length === 0 ||
              media.genres.some((genre) => selectedGenres.includes(genre))
          )
          .map((media: Media) => (
            <ListCard {...media} />
          ))}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
