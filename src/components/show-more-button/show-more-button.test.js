import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";

it(`Should render ShowMoreButton component`, () => {
  const showMoreMovies = jest.fn();

  const tree = renderer
    .create(
        <ShowMoreButton
          showMoreMovies={showMoreMovies}
        />
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
