"use client";
import React from "react";

const DetailsCard = ({ data }) => {
  const media = data.Media;

  return (
    <>
      <div>
        <img src={media.bannerImage} alt="Banner Image" />
        <img src={media.coverImage.large} alt={media.title.english} />
        <h1>{media.title.english}</h1>
        <h2>{media.title.romaji}</h2>
        <h2>{media.title.native}</h2>
        {media.meanScore && <p>Mean Score: {media.meanScore}</p>}
        {media.averageScore && <p>Average Score: {media.averageScore}</p>}
        {media.popularity && <p>Popularity: {media.popularity}</p>}
        {media.genres && <p>Genres: {media.genres.join(", ")}</p>}
        {media.seasonYear && <p>Season Year: {media.seasonYear}</p>}
        {media.format && <p>Format: {media.format}</p>}
        {media.status && <p>Status: {media.status}</p>}
        {media.description &&
          media.description.split("<br>").map((item, key) => {
            return <p key={key}>{item}</p>;
          })}
        {media.startDate.year && <p>Start Year: {media.startDate.year}</p>}
        {media.endDate.year && <p>End Year: {media.endDate.year}</p>}
        {media.episodes && <p>Episodes: {media.episodes}</p>}
        {media.duration && <p>Duration: {media.duration}</p>}
      </div>
    </>
  );
};

export default DetailsCard;
