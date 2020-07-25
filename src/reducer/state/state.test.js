import {reducer, ActionType, ActionCreator} from "../state/state.js";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT, SHOW_DEFAULT_MOVIES} from "../../const.js";

const initialState = {
  genre: ALL_GENRES,
  selectedMovieId: 0,
  showedMovies: MOVIES_DEFAULT_AMOUNT
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change genre`, () => {
  expect(reducer({genre: ALL_GENRES}, {
    type: ActionType.CHANGE_GENRE,
    payload: `Sci-Fi`,
  })).toEqual({
    genre: `Sci-Fi`
  });

  expect(reducer({genre: ALL_GENRES}, {
    type: ActionType.CHANGE_GENRE,
    payload: `Adventure`,
  })).toEqual({
    genre: `Adventure`
  });
});

it(`Reducer should increase and reset movies counter`, () => {
  expect(reducer({showedMovies: MOVIES_DEFAULT_AMOUNT}, {
    type: ActionType.SHOW_MORE_MOVIES,
  })).toEqual({
    showedMovies: 16
  });

  expect(reducer({showedMovies: SHOW_DEFAULT_MOVIES}, {
    type: ActionType.SHOW_DEFAULT_MOVIES,
  })).toEqual({
    showedMovies: MOVIES_DEFAULT_AMOUNT
  });
});

it(`Action creator should return correct action`, () => {
  expect(ActionCreator.changeGenre(`Adventure`)).toEqual({
    type: ActionType.CHANGE_GENRE,
    payload: `Adventure`
  });
  expect(ActionCreator.showMoreMovies()).toEqual({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: null,
  });
  expect(ActionCreator.showDefaultMovies()).toEqual({
    type: ActionType.SHOW_DEFAULT_MOVIES,
    payload: null,
  });
});

it(`Action creator should return default genre if no genre provided`, () => {
  expect(ActionCreator.changeGenre()).toEqual({
    type: ActionType.CHANGE_GENRE,
    payload: ALL_GENRES,
  });
});
