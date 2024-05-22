import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { db, auth, doc, onAuthStateChanged } from "@/config/firebase";
import "firebase/auth"; // Import Firebase Authentication
import "firebase/firestore"; // Import Firestore

const ListCard = ({ genres, id, title, coverImage, seasonYear }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleFavorite = async () => {
    if (!user) return;

    setIsClicked(!isClicked);

    const docRef = doc(db, "userData", user.uid);

    if (isClicked) {
      await docRef.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(id),
      });
    } else {
      await docRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(id),
      });
    }
  };

  return (
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
      <div className="px-6 pb-2 self-end">
        <FavoriteBorderIcon
          onClick={toggleFavorite}
          style={{ color: user && isClicked ? "red" : "black" }}
        />
      </div>
    </div>
  );
};

export default ListCard;
