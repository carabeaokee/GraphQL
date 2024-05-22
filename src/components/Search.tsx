"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString() || ""
  );

  useEffect(() => {
    setSearchTerm(""); // clear the search term when the pathname changes
  }, [pathname]);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const executeSearchOnClick = () => {
    console.log(`Searching... ${debouncedSearchTerm}`);
    replace(`/search-results?query=${debouncedSearchTerm}`);
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button onClick={executeSearchOnClick}>Enter</button>
      </div>
    </>
  );
}

// const handleSearch = useDebouncedCallback((term: string) => {
//   console.log(`Searching... ${term}`);
//   const params = new URLSearchParams(searchParams);
//   params.set("page", "1");

//   if (term) {
//     params.set("query", term);
//   } else {
//     params.delete("query");
//   }

//   replace(`${pathname}?${params.toString()}`);
