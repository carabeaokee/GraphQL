import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { db, auth } from "@/config/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";
import "firebase/auth"; // Import Firebase Authentication
import "firebase/firestore"; // Import Firestore

const ListCard = ({ genres, id, title, coverImage, seasonYear }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [queue, setQueue] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      // Create a new document in Firestore if user doesn't exist
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, { favorites: [], watched: [], queue: [] });
        }
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleFavorite = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const favorites = docSnap.data().favorites || [];

    if (favorites.includes(id)) {
      await updateDoc(docRef, {
        favorites: arrayRemove(id),
      });
    } else {
      await updateDoc(docRef, {
        favorites: arrayUnion(id),
      });
    }
  };

  const toggleWatched = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const watched = docSnap.data().watched || [];

    if (watched.includes(id)) {
      await updateDoc(docRef, {
        watched: arrayRemove(id),
      });
    } else {
      await updateDoc(docRef, {
        watched: arrayUnion(id),
      });
    }
  };

  const toggleQueue = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const queue = docSnap.data().queue || [];

    if (queue.includes(id)) {
      await updateDoc(docRef, {
        queue: arrayRemove(id),
      });
    } else {
      await updateDoc(docRef, {
        queue: arrayUnion(id),
      });
    }
  };

  // Fetch user's list from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserList = async () => {
        const uid = user.uid;
        const path = doc(db, "users", uid);
        const docSnap = await getDoc(path);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []);
          setWatched(docSnap.data().watched || []);
          setQueue(docSnap.data().queue || []);
        }
      };

      fetchUserList();
    }
  }, [user, favorites, watched, queue]);

  const isFavorites = favorites.includes(id);
  const isWatched = watched.includes(id);
  const isQueued = queue.includes(id);

  return (
    <>
      <div
        key={id}
        className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col"
      >
        <Link href={`/details/${id}`}>
          <img className="w-full" src={coverImage.large} alt={title.english} />
        </Link>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {title.english ? title.english : title.romaji}
          </div>
          {seasonYear && (
            <p className="text-gray-700 text-base">Season Year: {seasonYear}</p>
          )}
        </div>
        <div className="px-6 pt-4 pb-2 flex-grow">
          {genres?.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="px-6 pb-2 flex justify-end">
          <div className="pr-2">
            <FavoriteBorderIcon
              onClick={toggleFavorite}
              style={{ color: user && isFavorites ? "red" : "black" }}
            />
          </div>

          <div className="pr-2">
            <VisibilityIcon
              onClick={toggleWatched}
              style={{ color: user && isWatched ? "blue" : "black" }}
            />
          </div>

          <div>
            <AddToQueueIcon
              onClick={toggleQueue}
              style={{ color: user && isQueued ? "green" : "black" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
