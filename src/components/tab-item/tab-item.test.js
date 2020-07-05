import React from "react";
import renderer from "react-test-renderer";
import TabItem from "./tab-item.jsx";

const className = `catalog__genres-`;

const mockProps = {
  tabName: `tabName`,
  activeTab: `activeTab`,
  onTabClick: () => {}
};

it(`Should render TabItem component`, () => {
  const tree = renderer
    .create(
        <TabItem
          className={className}
          {...mockProps}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
