"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

// "use client";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { useState } from "react";

// export function Search({ onSearch }) {
//   const [inputValue, setInputValue] = useState("");
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const pathname = usePathname();

//   const handleSearch = useDebouncedCallback((term: string) => {
//     console.log(`Searching... ${term}`);
//     const params = new URLSearchParams(searchParams);
//     params.set("page", "1");

//     if (term) {
//       params.set("query", term);
//     } else {
//       params.delete("query");
//     }

//     replace(`${pathname}?${params.toString()}`);
//     onSearch(term);
//   }, 300);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search"
//         onChange={(e) => handleSearch(e.target.value)}
//         defaultValue={searchParams.get("query")?.toString()}
//       />
//     </div>
//   );
// }
