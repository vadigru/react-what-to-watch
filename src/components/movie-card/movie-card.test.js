import * as React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  title: `Movie Name`,
  posterUrl: `https://url.com`,
  backgroundUrl: `https://url.com`,
  backgroundColor: `some color`,
  previewUrl: `https://url.com`,
  previewImage: `https://url.com`,
  genre: `genre`,
  release: 2020,
  director: `Famous Director`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 30m`,
  rating: 10,
  votes: 1000000,
  description: `Some Description`,
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
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
