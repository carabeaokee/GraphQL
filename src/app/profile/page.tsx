"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import "firebase/auth"; // Import Firebase Authentication
import "firebase/firestore"; // Import Firestore

// Defining a functional component for the profile page
export default function ProfilePage() {
  // Using the useRouter hook from Next.js to get the router object
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [queue, setQueue] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    // Getting the user item from the session storage
    const user = sessionStorage.getItem("user");
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPath = `${pathname}?${searchParams.toString()}`;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }

    const userDocRef = doc(db, "users", user.uid);

    userDocRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setFavorites(userData.favorites);
          setQueue(userData.queue);
          setWatched(userData.watched);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error: any) => {
        console.log("Error getting document:", error);
      });
  }, []); // The empty array means this effect will only run once when the component mounts

  return (
    <>
      <div>
        <h1>Profile Page</h1>
      </div>
    </>
  );
}
