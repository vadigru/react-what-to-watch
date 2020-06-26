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
          preview={previewUrl}
          autoplay={autoplay}
          mute={mute}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
