import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const UserData = {
  login: ``,
  password: ``
};

const preventEvent = {
  preventDefault() {}
};

it(`Should submit a form`, () => {
  const handleSubmit = jest.fn(() => {});

  const signIn = mount(
      <SignIn
        isValid={true}
        onSubmit={handleSubmit}
      />
  );

  const form = signIn.find(`.sign-in__form`);

  form.simulate(`submit`, preventEvent);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(UserData);
});
