import * as React from "react";
import * as renderer from "react-test-renderer";

import withActiveTab from "./with-active-tab";

import {noop} from "../../utils/common";

const MockComponent = () => <div />;

const MockComponentWithActiveTab = withActiveTab(MockComponent);

it(`render withForm`, () => {
  const tree = renderer.create(
      <MockComponentWithActiveTab
        activeTab={``}
        onTabClick={noop}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
