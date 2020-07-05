import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {ALL_GENRES} from "./const.js";
import films from "./mocks/films.js";

const initialState = {
  genre: ALL_GENRES,
  films
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

it(`Action creator should return correct action`, () => {
  expect(ActionCreator.changeGenre(`Adventure`)).toEqual({
    type: ActionType.CHANGE_GENRE,
    payload: `Adventure`
  });
});

it(`Action creator should return default genre if no genre provided`, () => {
  expect(ActionCreator.changeGenre()).toEqual({
    type: ActionType.CHANGE_GENRE,
    payload: ALL_GENRES,
  });
});
