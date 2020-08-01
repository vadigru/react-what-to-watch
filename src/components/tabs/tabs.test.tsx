import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";

const tabNames = [`Overview`, `Details`, `Reviews`];

it(`Should render Tabs component`, () => {
  const changeGenre = jest.fn();
  const showDefaultMovies = jest.fn();

  const tree = renderer
    .create(
        <Tabs
          className={`catalog__genres-`}
          tabNames={tabNames}
          activeTab={tabNames[0]}
          onTabClick={changeGenre}
          onGenreTabClick={showDefaultMovies}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
