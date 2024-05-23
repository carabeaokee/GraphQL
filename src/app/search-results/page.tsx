"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";
import ListCard from "../../components/ListCard";

//  component responsible for displaying search results
export default function SearchResults() {
  // useSearchParams hook to get the search query from the URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // useQuery hook to fetch data from the GraphQL API
  const { data, loading, error } = useQuery(MEDIA_QUERY, {
    variables: {
      page: 1,
      type: "ANIME",
      isAdult: false,
      perPage: 50,
      search: searchTerm,
    },
  });

  // filter the data based on the search term
  const filteredMedia = data?.Page?.media?.filter(
    (anime: Anime) =>
      (anime.title.english &&
        anime.title.english.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (anime.title.romaji &&
        anime.title.romaji.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  interface Anime {
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
    <div className="grid grid-cols-5 gap-4">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : filteredMedia.length === 0 ? (
        <div>No results found</div>
      ) : (
        filteredMedia.map((anime: Anime) => (
          <ListCard key={anime.id} {...anime} />
        ))
      )}
    </div>
  );
}
