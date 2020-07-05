import React from "react";
import renderer from "react-test-renderer";
import Tabs from "../tabs/tabs.jsx";

const mock = {
  activeTab: `Overview`,
  tabNames: [`Overview`, `Details`, `Reviews`],
};

it(`Should render Tabs component`, () => {
  const tree = renderer
    .create(
        <Tabs
          tabNames={mock.tabNames}
          activeTab={mock.activeTab}
          onTabClick={() => {}}
          onGenreTabClick={() => {}}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
