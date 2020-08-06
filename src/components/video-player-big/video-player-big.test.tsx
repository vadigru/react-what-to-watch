import * as React from "react";
import * as renderer from "react-test-renderer";

import VideoPlayerBig from "./video-player-big";

import {Movie} from "../../prop-types/types";
import {noop} from "../../utils/common";

const movie: Movie = {
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
  id: 3,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

it(`Should render VideoPlayer component`, () => {
  const tree = renderer
    .create(
        <VideoPlayerBig
          videoLink={movie.videoUrl}
          videoBackground={movie.backgroundUrl}
          videoTitle={movie.title}
          isPlaying={false}
          duration={100}
          progress={0}
          autoPlay={true}
          videoRef={React.createRef()}
          onPlayButtonClick={noop}
          onFullscreenButtonClick={noop}
          onExitButtonClick={noop}
          onLoadedMetadata={noop}
          onTimeUpdate={noop}
        />
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
