"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { Search } from "@/components/Search";

const Navbar = () => {
  // State to hold the user object
  const [user, setUser] = useState<User | null>(null);
  // Next.js hook that gives us access to the router object
  const router = useRouter();

  // useEffect hook to set up a subscription to the Firebase Auth service
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle the logout
  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        console.log("You have successfully logged out");
      } catch (error) {
        console.error("Logout Error", error);
      }
    }
  };

  // Function to handle the profile click
  const handleProfileClick = (e: { preventDefault: () => void }) => {
    if (!user) {
      // Prevent accessing favorites if not user
      e.preventDefault();
      // Redirect to the redirection page
      router.push("/redirection");
    }
  };

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div style={{ display: "flex", gap: "2em" }}>
        <Search />
        <Link href="/">Homepage</Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <Link href="/animelist">Popular Anime</Link>
        <Link href="/favorites" onClick={handleProfileClick}>
          My Favorites
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
