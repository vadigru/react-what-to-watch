import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import withActiveCard from "./with-active-card.jsx";
import Namespace from "../../reducer/namespace.js";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

const films = [
  {
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 1`,
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 2`,
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 3`,
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
  },
];

const mockComponent = () => <div />;
const store = mockStore({
  [Namespace.DATA]: {
    films,
    promo: films[0]
  },
  [Namespace.STATE]: {
    genre: ALL_GENRES,
    showedMovies: MOVIES_DEFAULT_AMOUNT
  },
  [Namespace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH
  }
});


const MockComponentWrapped = withActiveCard(mockComponent);

it(`Should render MoviePage component`, ()=>{
  const tree = renderer.create(
      <Provider store={store}>
        <MockComponentWrapped
          // movies={films}
          // movie={movie}
          onMovieCardClick={()=>{}}
          getReviews={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render Main component`, ()=>{
  const tree = renderer.create(
      <Provider store={store}>
        <MockComponentWrapped
          // movies = {films}
          onMovieCardClick={() => {}}
          getReviews={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
