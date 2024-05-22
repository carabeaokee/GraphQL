"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";
import ListCard from "../../components/ListCard";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const { data, loading, error } = useQuery(MEDIA_QUERY, {
    variables: {
      page: 1,
      type: "ANIME",
      isAdult: false,
      perPage: 50,
      search: searchTerm,
    },
  });

  const filteredMedia = data?.Page?.media?.filter(
    (anime: Anime) =>
      (anime.title.english &&
        anime.title.english.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (anime.title.romaji &&
        anime.title.romaji.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log("Data:", data);
  console.log("Search term:", searchTerm);
  console.log("Filtered media:", filteredMedia);

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
