import React from "react";
import renderer from "react-test-renderer";
import withForm from "./with-form.jsx";

const MockComponent = () => <div />;

const MockComponentWithForm = withForm(MockComponent);

it(`render withForm`, () => {
  const tree = renderer.create(
      <MockComponentWithForm
        rating={0}
        comment={0}
        onFormDataChange={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
