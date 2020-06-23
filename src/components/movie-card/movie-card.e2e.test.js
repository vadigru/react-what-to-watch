import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie Description`
};

it(`Should pass data to the handler when hovering over a MoviCard`, () => {
  const handleMovieCardHover = jest.fn();
  const handleMovieCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieCardClick={handleMovieCardClick}
        onMovieCardHover={() => handleMovieCardHover(movie)}
      />
  );

  movieCard.simulate(`mouseOver`);

  expect(handleMovieCardHover.mock.calls.length).toBe(1);
  expect(handleMovieCardHover.mock.calls[0][0]).toMatchObject(movie);
});
