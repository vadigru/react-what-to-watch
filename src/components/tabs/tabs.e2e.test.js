import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const tabNames = [`Overview`, `Details`, `Reviews`];

const preventEvent = {
  preventDefault() {}
};


it(`Should tab be clicked`, () => {
  const changeGenre = jest.fn();
  const showDefaultMovies = jest.fn();

  const tabs = shallow(
      <Tabs
        className={`catalog__genres-`}
        tabNames={tabNames}
        activeTab={`Overview`}
        onTabClick={changeGenre}
        onGenreTabClick={showDefaultMovies}
      />
  );

  const tabName = tabs.find(`a.catalog__genres-link`).at(0);

  tabName.simulate(`click`, preventEvent);
  expect(changeGenre.mock.calls.length).toBe(2);
  expect(changeGenre.mock.calls[0][0]).toBe(tabNames[0]);
});
