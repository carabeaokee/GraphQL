"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar";

// Defining a functional component for the profile page
export default function ProfilePage() {
  // Using the useRouter hook from Next.js to get the router object
  const router = useRouter();

  useEffect(() => {
    // Getting the user item from the session storage
    const user = sessionStorage.getItem("user");

    // Using the usePathname and useSearchParams hooks to get the current path and search parameters
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // Constructing the current URL
    const currentPath = `${pathname}?${searchParams.toString()}`;

    // If the user is not logged in, redirecting them to the login page
    // The current URL is added as a redirect query parameter
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, []); // The empty array means this effect will only run once when the component mounts

  return (
    <>
      <div>
        <h1>Profile Page</h1>
      </div>
    </>
  );
}
