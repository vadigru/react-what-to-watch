import {
  ALL_GENRES,
  MOVIES_DEFAULT_AMOUNT,
  MOVIES_STEP_AMOUNT
} from "../../const.js";
import {extend} from "../../utils/common.js";

const initialState = {
  genre: ALL_GENRES,
  showedMovies: MOVIES_DEFAULT_AMOUNT,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SHOW_DEFAULT_MOVIES: `SHOW_DEFAULT_MOVIES`,
};

const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: null,
  }),
  showDefaultMovies: () => ({
    type: ActionType.SHOW_DEFAULT_MOVIES,
    payload: null,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        showedMovies: state.showedMovies + MOVIES_STEP_AMOUNT,
      });
    case ActionType.SHOW_DEFAULT_MOVIES:
      return extend(state, {
        showedMovies: MOVIES_DEFAULT_AMOUNT,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
