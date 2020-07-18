import React from "react";
import renderer from "react-test-renderer";
import withPlayer from "./with-player.jsx";

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

const MockComponent = () => <div>
  <video
    ref={ref}
    src={movie.previewUrl}
    previewImage={movie.previewImage}
    className="player__video"
    poster={movie.backgroundUrl}
    width="100%"
    autoPlay={false}
    onClick={() => {}}
    onLoadedMetadata={() => {}}
    onTimeUpdate={() => {}}
  >
  </video>
  <button className="pause" onClick={() => {}} />
  <button className="play" onClick={() => {}} />
</div>;

const MockComponentWrapped = withPlayer(MockComponent);
const ref = React.createRef();
it(`render withPlayer`, () => {
  const tree = renderer.create(
      <MockComponentWrapped movie={movie} autoPlay={false} onExitButtonClick={() => {}}>
        <video
          ref={ref}
          src={movie.previewUrl}
          previewImage={movie.previewImage}
          className="player__video"
          poster={movie.backgroundUrl}
          width="100%"
          autoPlay={false}
          onClick={() => {}}
          onLoadedMetadata={() => {}}
          onTimeUpdate={() => {}}
        >
        </video>
      </MockComponentWrapped>, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
