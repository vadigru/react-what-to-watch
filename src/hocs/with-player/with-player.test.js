import React from "react";
import renderer from "react-test-renderer";
import withPlayer from "./with-player.jsx";

const movie = {
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie Description`,
  reviews: [
    {
      date: `June 25, 2020`,
      user: `John Doe`,
      comment: `Comment text.`,
      rating: 8.9
    },
  ]
};

const MockComponent = () => <div>
  <video
    ref={ref}
    src={movie.previewUrl}
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
