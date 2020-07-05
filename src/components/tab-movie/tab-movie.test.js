import React from "react";
import renderer from "react-test-renderer";
import TabMovie from "../tab-movie/tab-movie.jsx";

const mockProps = {
  tabNames: [`Overview`, `Details`, `Reviews`],
  tabName: `tabName`,
  activeTab: `activeTab`,
  onTabClick: () => {}
};

it(`Should render TabMovie component`, () => {
  const tree = renderer
    .create(
        <TabMovie
          {...mockProps}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
