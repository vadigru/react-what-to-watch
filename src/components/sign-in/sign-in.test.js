import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`Should render SignIn component`, () => {
  const onSignInClickHandler = jest.fn();

  const tree = renderer
    .create(
        <SignIn
          isValid={true}
          onSubmit={() => {}}
          onClick={onSignInClickHandler}
        />
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
