import React from "react";
import renderer from "react-test-renderer";
import VideoPlayerBig from "./video-player-big.jsx";

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

it(`Should render VideoPlayer component`, () => {
  const ref = React.createRef();
  const tree = renderer
    .create(
        <VideoPlayerBig
          isPlaying={false}
          src={movie.videoUrl}
          autoPlay={false}
          movie={movie}
          onPlayButtonClick={() => {}}
          onFullscreenButtonClick={() => {}}
          getPlaybackProgress={() => {}}
          getRemainingTime={() => {}}
          videoRef={ref}
          onExitButtonClick={() => {}}
          onLoadedMetadata={() => {}}
          onTimeUpdate={() => {}}
          videoUrl={movie.videoUrl}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
