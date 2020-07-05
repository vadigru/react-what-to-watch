import React from "react";
import renderer from "react-test-renderer";
import TabCatalog from "./tab-genres.jsx";

const className = ``;

const mockProps = {
  tabName: `tabName`,
  activeTab: `activeTab`,
  onTabClick: () => {}
};

it(`Should render TabCatalog component`, () => {
  const tree = renderer
    .create(
        <TabCatalog
          className={className}
          {...mockProps}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
