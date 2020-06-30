import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews.jsx";

const mock = [
  {
    date: `June 25, 2020`,
    user: `John Doe`,
    comment: `Comment text.`,
    rating: 8.9
  },
  {
    date: `June 25, 2020`,
    user: `John Doe`,
    comment: `Comment text.`,
    rating: 8.9
  },
];

it(`Should render MovieDetails component`, () => {
  const tree = renderer
    .create(
        <MovieReviews
          reviews={mock}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
