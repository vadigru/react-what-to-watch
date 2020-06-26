import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

const mock = {
  posterUrl: `https://url.com/poster.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  autoplay: true,
  mute: true
};

it(`Should render VideoPlayer component`, () => {
  const {previewUrl, autoplay, mute} = mock;
  const tree = renderer
    .create(
        <VideoPlayer
          src={previewUrl}
          autoplay={autoplay}
          muted={mute}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
