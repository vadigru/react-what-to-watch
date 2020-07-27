import React from "react";
import renderer from "react-test-renderer";
import withForm from "./with-form.jsx";

const MockComponent = () => <div>

</div>;

const MockComponentWithForm = withForm(MockComponent);

it(`render withForm`, () => {
  const tree = renderer.create(
      <MockComponentWithForm>
        isCommentAdded={false}
        isFormInvalid={true}
        onCommentPost={() => {}}
        onTextareaChange={() => {}}
      </MockComponentWithForm>, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
