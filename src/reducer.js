import {ALL_GENRES} from "./const.js";
import {extend} from "./utils/common.js";
import films from "./mocks/films.js";

const initialState = {
  genre: ALL_GENRES,
  films,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
