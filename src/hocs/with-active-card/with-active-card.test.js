import React from "react";
import withActiveCard from "./with-active-card.jsx";
import renderer from "react-test-renderer";

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

const movies = [
  {
    title: `Movie title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie description`,
    reviews: [
      {
        date: `June 25, 2020`,
        user: `John Doe`,
        comment: `Comment text.`,
        rating: 8.9
      },
    ]
  }
];

const movie = {
  title: `Movie title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor 1`, `Actor 2`, `Actor 3`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie description`,
  reviews: [
    {
      date: `June 25, 2020`,
      user: `John Doe`,
      comment: `Comment text.`,
      rating: 8.9
    },
  ]
};

const mockComponent = () => <div />;

const MockComponentWrapped = withActiveCard(mockComponent);

it(`Should render MoviePage component`, ()=>{
  const tree = renderer.create(
      <MockComponentWrapped
        movies={movies}
        movie={movie}
        onMovieCardClick={()=>{}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render Main component`, ()=>{
  const tree = renderer.create(
      <MockComponentWrapped
        promoTitle = {FilmData.TITLE}
        promoGenre = {FilmData.GENRE}
        promoYear = {FilmData.YEAR}
        movies = {movies}
        onMovieCardClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
