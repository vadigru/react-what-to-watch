import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";

import Footer from "./footer";

import {AuthorizationStatus} from "../../reducer/user/user";
// import {mapStateToProps} from "../../reducer/state/selectors";
import Namespace from "../../reducer/namespace";
// import {getSelectedMovie} from "../../reducer/state/selectors";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import history from "../../history";

const mockStore = configureStore([]);

// const films = [
//   {
//     title: `Movie Name`,
//     posterUrl: `https://url.com`,
//     backgroundUrl: `https://url.com`,
//     backgroundColor: `some color`,
//     previewUrl: `https://url.com`,
//     previewImage: `https://url.com`,
//     genre: `genre`,
//     release: 2020,
//     director: `Famous Director`,
//     starring: [`Actor One`, `Actor Two`, `Actor Three`],
//     time: `1h 30m`,
//     rating: 10,
//     votes: 1000000,
//     description: `Some Description`,
//     id: 1,
//     isFavorite: true,
//     videoUrl: `https://url.com`,
//   },
//   {
//     title: `Movie Name`,
//     posterUrl: `https://url.com`,
//     backgroundUrl: `https://url.com`,
//     backgroundColor: `some color`,
//     previewUrl: `https://url.com`,
//     previewImage: `https://url.com`,
//     genre: `genre 1`,
//     release: 2020,
//     director: `Famous Director`,
//     starring: [`Actor One`, `Actor Two`, `Actor Three`],
//     time: `1h 30m`,
//     rating: 10,
//     votes: 1000000,
//     description: `Some Description`,
//     id: 1,
//     isFavorite: true,
//     videoUrl: `https://url.com`,
//   },
//   {
//     title: `Movie Name`,
//     posterUrl: `https://url.com`,
//     backgroundUrl: `https://url.com`,
//     backgroundColor: `some color`,
//     previewUrl: `https://url.com`,
//     previewImage: `https://url.com`,
//     genre: `genre 2`,
//     release: 2020,
//     director: `Famous Director`,
//     starring: [`Actor One`, `Actor Two`, `Actor Three`],
//     time: `1h 30m`,
//     rating: 10,
//     votes: 1000000,
//     description: `Some Description`,
//     id: 1,
//     isFavorite: true,
//     videoUrl: `https://url.com`,
//   },
//   {
//     title: `Movie Name`,
//     posterUrl: `https://url.com`,
//     backgroundUrl: `https://url.com`,
//     backgroundColor: `some color`,
//     previewUrl: `https://url.com`,
//     previewImage: `https://url.com`,
//     genre: `genre 3`,
//     release: 2020,
//     director: `Famous Director`,
//     starring: [`Actor One`, `Actor Two`, `Actor Three`],
//     time: `1h 30m`,
//     rating: 10,
//     votes: 1000000,
//     description: `Some Description`,
//     id: 1,
//     isFavorite: true,
//     videoUrl: `https://url.com`,
//   },
// ];

// const movie = {
//   title: `Movie Name`,
//   posterUrl: `https://url.com`,
//   backgroundUrl: `https://url.com`,
//   backgroundColor: `some color`,
//   previewUrl: `https://url.com`,
//   previewImage: `https://url.com`,
//   genre: `genre`,
//   release: 2020,
//   director: `Famous Director`,
//   starring: [`Actor One`, `Actor Two`, `Actor Three`],
//   time: `1h 30m`,
//   rating: 10,
//   votes: 1000000,
//   description: `Some Description`,
//   id: 1,
//   isFavorite: true,
//   videoUrl: `https://url.com`,
// };

it(`Should render Header component`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films: [],
      promo: {},
      reviews: [],
      isFilmsLoading: false,
      isPromoLoading: false,
      isReviewsLoading: false,
      isReviewPosting: false,
      isReviewSendingError: false,
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: MOVIES_DEFAULT_AMOUNT,
      selectedMovieId: 8
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isValidAuthorization: true,
      avatarUrl: ``,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Footer
              className={``}
            />
          </Router>
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
