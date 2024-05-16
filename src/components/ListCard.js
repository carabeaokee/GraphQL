import React from "react";
import Link from "next/link";

const ListCard = ({ genres, id, title, coverImage, seasonYear }) => (
  <div key={id} className="max-w-sm rounded overflow-hidden shadow-lg">
    <Link href={`/details/${id}`}>
      <img className="w-full" src={coverImage.large} alt={title.english} />
    </Link>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">
        {title.english ? title.english : title.romaji}
      </div>
      <p className="text-gray-700 text-base">Season Year: {seasonYear}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      {genres.map((genre, index) => (
        <span
          key={index}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {genre}
        </span>
      ))}
    </div>
  </div>
);

export default ListCard;
