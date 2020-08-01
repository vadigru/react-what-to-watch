import * as React from "react";
import * as renderer from "react-test-renderer";

import withForm from "./with-form";

import {noop} from "../../utils/common";

const MockComponent = () => <div />;

const MockComponentWithForm = withForm(MockComponent);

it(`render withForm`, () => {
  const tree = renderer.create(
      <MockComponentWithForm
        rating={0}
        comment={0}
        onFormDataChange={noop}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
