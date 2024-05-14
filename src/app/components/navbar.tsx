"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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

  const handleFavoritesClick = (e: { preventDefault: () => void }) => {
    if (!user) {
      e.preventDefault();
      router.push("/authorization");
    }
  };

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div style={{ display: "flex", gap: "2em" }}>
        <Link href="/home">Homepage</Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <Link href="/animelist">Popular Anime</Link>
        <Link href="/favorites" onClick={handleFavoritesClick}>
          My Favorites
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
