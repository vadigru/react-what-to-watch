import React from "react";
import renderer from "react-test-renderer";
import withVideo from "./with-video.jsx";

const mockComponent = () => <div />;

const MockComponentWrapped = withVideo(mockComponent);

it(`Should render Tabs component`, ()=>{
  const tree = renderer.create(
      <MockComponentWrapped
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        isPlaying={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
