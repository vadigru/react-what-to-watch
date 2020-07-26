import React from "react";
import renderer from "react-test-renderer";
import withForm from "./with-form.jsx";

// const movie = {
//   title: `Movie Name`,
//   posterUrl: `https://url.com`,
//   backgroundUrl: `https://url.com`,
//   backgroundColor: `some color`,
//   previewUrl: `https://url.com`,
//   previewImage: `https://url.com`,
//   genre: `genre`,
//   release: 2020,
//   director: `Famous Director`,
//   starring: [`Actor One`, `Actor Two`, `Actor Three`],
//   time: `1h 30m`,
//   rating: 10,
//   votes: 1000000,
//   description: `Some Description`,
//   id: 1,
//   isFavorite: true,
//   videoUrl: `https://url.com`,
// };

const MockComponent = () => <div>

</div>;

const MockComponentWithForm = withForm(MockComponent);
// const ref = React.createRef();
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
