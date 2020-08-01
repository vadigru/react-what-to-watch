import * as React from "react";
import * as renderer from "react-test-renderer";

import withPlayer from "./with-player";

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
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

const MockComponent = () => <div>
  <video
    ref={React.createRef()}
    src={movie.previewUrl}
    className="player__video"
    poster={movie.backgroundUrl}
    width="100%"
    autoPlay={false}
    onClick={noop}
    onLoadedMetadata={noop}
    onTimeUpdate={noop}
  >
  </video>
  <button className="pause" onClick={noop} />
  <button className="play" onClick={noop} />
</div>;

const MockComponentWrapped = withPlayer(MockComponent);

it(`render withPlayer`, () => {
  const tree = renderer.create(
      <MockComponentWrapped movie={movie} autoPlay={false} onExitButtonClick={noop} id={2}>
        <video
          ref={React.createRef()}
          src={movie.previewUrl}
          className="player__video"
          poster={movie.backgroundUrl}
          width="100%"
          autoPlay={false}
          onClick={noop}
          onLoadedMetadata={noop}
          onTimeUpdate={noop}
        >
        </video>
      </MockComponentWrapped>, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
