"use client";
import React from "react";

const DetailsCard = ({ data }) => {
  const media = data.Media;

  return (
    <>
      <img src={media.bannerImage} alt="Banner Image" />
      <div>
        <img src={media.coverImage.large} alt={media.title.english} />
        <h1>{media.title.english}</h1>
        <h2>{media.title.romaji}</h2>
        <h2>{media.title.native}</h2>
        <p>Mean Score: {media.meanScore}</p>
        <p>Average Score: {media.averageScore}</p>
        <p>Popularity: {media.popularity}</p>
        <p>Genres: {media.genres.join(", ")}</p>
        <p>Season Year: {media.seasonYear}</p>
        <p>Format: {media.format}</p>
        <p>Status: {media.status}</p>
        {media.description.split("<br>").map((item, key) => {
          return <p key={key}>{item}</p>;
        })}
        <p>Start Year: {media.startDate.year}</p>
        <p>End Year: {media.endDate.year}</p>
        <p>Episodes: {media.episodes}</p>
        <p>Duration: {media.duration}</p>
        <img src={media.bannerImage} alt="Banner Image" />
        {/* <p>Is Favourite: {media.isFavourite ? 'Yes' : 'No'}</p> */}
      </div>
    </>
  );
};

export default DetailsCard;
