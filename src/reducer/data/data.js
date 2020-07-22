import {extend} from "../../utils/common.js";
import {rebuildMovieData, rebuildMoviesData} from "../../utils/common.js";

const initialState = {
  films: [],
  promo: {},
  reviews: []
};

const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO: `GET_PROMO`,
  GET_REVIEWS: `GET_REVIEWS`
};

const ActionCreator = {
  getMovies: (movies) => ({
    type: ActionType.GET_MOVIES,
    payload: movies,
  }),
  getPromo: (movie) => ({
    type: ActionType.GET_PROMO,
    payload: movie,
  }),
  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),
};

const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.getMovies(rebuildMoviesData(response.data)));
      });
  },
  getPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getPromo(rebuildMovieData(response.data)));
      });
  },
  getReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.GET_PROMO:
      return extend(state, {
        promo: action.payload,
      });
    case ActionType.GET_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
