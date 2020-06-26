import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  posterUrl: `https://url.com/poster.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  autoplay: false,
  mute: true
};

it(`Should change VideoPlayer state on click`, () => {
  const {previewUrl, autoplay, mute} = mock;

  const spy = jest
    .spyOn(window.HTMLMediaElement.prototype, `play`)
    .mockImplementation(() => {});

  const videoPlayer = mount(
      <VideoPlayer
        src={previewUrl}
        autoplay={autoplay}
        muted={mute}
      />
  );
  expect(videoPlayer.state(`isPlaying`)).toBe(false);
  videoPlayer.simulate(`click`);
  expect(videoPlayer.state(`isPlaying`)).toBe(true);
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
