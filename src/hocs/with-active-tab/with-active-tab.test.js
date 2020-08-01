import * as React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.jsx";

const MockComponent = () => <div />;

const MockComponentWithActiveTab = withActiveTab(MockComponent);

it(`render withForm`, () => {
  const tree = renderer.create(
      <MockComponentWithActiveTab
        activeTab={``}
        onTabClick={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
