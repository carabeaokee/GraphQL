import Navbar from "@/app/components/navbar";
import MediaList from "@/app/graphql/queries";

export default function AnimeList() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <br />
        <h1>This is the Anime List</h1>
        <MediaList />
      </div>
    </main>
  );
}
