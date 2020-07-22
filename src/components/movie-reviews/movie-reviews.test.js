import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

const mock = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

it(`Should render MovieDetails component`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      reviews: []
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MovieReviews
            reviews={mock}
          />
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
