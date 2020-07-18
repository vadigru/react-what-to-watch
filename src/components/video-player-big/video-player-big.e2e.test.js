import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayerBig from './video-player-big.jsx';

configure({
  adapter: new Adapter()
});

const movie = {
  title: `Movie Name`,
  posterUrl: `https://url.com`,
  backgroundUrl: `https://url.com`,
  backgroundColor: `some color`,
  previewUrl: `https://url.com`,
  previewImage: `https://url.com`,
  genre: `genre`,
  release: 2020,
  director: `Famous Director`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 30m`,
  rating: 10,
  votes: 1000000,
  description: `Some Description`,
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

it(`Click by Play, Exit and FullScreen button calls callback`, () => {
  const hadleBigPlayerPlay = jest.fn();
  const handleFullscreenButtonClick = jest.fn();
  const handleExitButtonClick = jest.fn();

  const ref = React.createRef();
  const wrapper = mount(<VideoPlayerBig
    isPlaying={false}
    src={movie.videoUrl}
    autoPlay={false}
    movie={movie}
    onPlayButtonClick={hadleBigPlayerPlay}
    onFullscreenButtonClick={handleFullscreenButtonClick}
    getPlaybackProgress={() => {}}
    getRemainingTime={() => {}}
    videoRef={ref}
    onExitButtonClick={handleExitButtonClick}
    onLoadedMetadata={() => {}}
    onTimeUpdate={() => {}}
    videoUrl={movie.videoUrl}
  />);

  wrapper.find(`.player__play`).simulate(`click`);
  wrapper.find(`.player__full-screen`).simulate(`click`);
  wrapper.find(`.player__exit`).simulate(`click`);

  expect(hadleBigPlayerPlay).toHaveBeenCalledTimes(1);
  expect(handleFullscreenButtonClick).toHaveBeenCalledTimes(1);
  expect(handleExitButtonClick).toHaveBeenCalledTimes(1);
});
