import React from "react";
import renderer from "react-test-renderer";
import TabGenres from "./tab-genres.jsx";

const mockProps = {
  tabNames: [`Overview`, `Details`, `Reviews`],
  tabName: `tabName`,
  activeTab: `activeTab`,
  onTabClick: () => {}
};

it(`Should render TabGenres component`, () => {
  const tree = renderer
    .create(
        <TabGenres
          {...mockProps}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
