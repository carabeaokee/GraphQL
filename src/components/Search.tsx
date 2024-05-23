"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

// Search component
export function Search() {
  // useSearchParams hook to get the search query from the URL
  const searchParams = useSearchParams();
  // useRouter hook to get the router object
  const { replace } = useRouter();
  // usePathname hook to get the current pathname
  const pathname = usePathname();
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState(
    // get the query parameter from the URL
    searchParams.get("query")?.toString() || ""
  );

  // useEffect hook to clear the search term when the pathname changes
  useEffect(() => {
    setSearchTerm("");
  }, [pathname]);

  // useDebounce hook to debounce the search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Function to execute the search when the user clicks the button
  const executeSearchOnClick = () => {
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
