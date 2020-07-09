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

it(`Should pass data to the handler when hovering over a MoviCard`, () => {
  const handleMovieCardMouseEnter = jest.fn();
  const handleMovieCardMouseLeave = jest.fn();
  const handleMovieCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieCardClick={handleMovieCardClick}
        onMouseEnter={() => handleMovieCardMouseEnter(movie)}
        onMouseLeave={() => handleMovieCardMouseLeave(movie)}
        isPlaying={true}
      />
  );

  movieCard.simulate(`mouseEnter`);
  movieCard.simulate(`mouseLeave`);

  expect(handleMovieCardMouseEnter.mock.calls.length).toBe(1);
  expect(handleMovieCardMouseEnter.mock.calls[0][0]).toMatchObject(movie);
  expect(handleMovieCardMouseLeave.mock.calls.length).toBe(1);
});
