import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button";

it(`Should render ShowMoreButton component`, () => {
  const showMoreMovies = jest.fn();

  const tree = renderer
    .create(
        <ShowMoreButton
          onShowMoreButtonClick={showMoreMovies}
        />
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
