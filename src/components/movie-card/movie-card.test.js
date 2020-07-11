import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie Description`,
  reviews: [
    {
      date: `June 25, 2020`,
      user: `John Doe`,
      comment: `Comment text.`,
      rating: 8.9
    },
  ]
};

it(`Should render MovieCard component`, () => {
  const tree = renderer
    .create(
        <MovieCard
          movie={movie}
          onMovieCardClick={() => () => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          isPlaying={true}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
