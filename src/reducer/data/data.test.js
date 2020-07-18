import {reducer, ActionType, ActionCreator, Operation} from "../data/data.js";
import {filterMoviesByGenre} from "../data/selectors.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {rebuildMovieData} from "../../utils/common.js";
const api = createAPI(() => {});

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

const initialState = {
  films: [],
  promo: {},
  reviews: []
};

const reviews = [
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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Action creator should return correct action`, () => {
  expect(ActionCreator.getMovies(films)).toEqual({
    type: ActionType.GET_MOVIES,
    payload: films
  });
  expect(ActionCreator.getPromo(movie)).toEqual({
    type: ActionType.GET_PROMO,
    payload: movie,
  });
});


it(`Should make a correct API call to /films`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const moviesLoader = Operation.getMovies();

  apiMock.onGet(`/films`).reply(200, []);

  return moviesLoader(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.GET_MOVIES,
      payload: []
    });
  });
});

it(`Should make a correct API call to /films/promo`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const movieLoader = Operation.getPromo();

  apiMock.onGet(`/films/promo`).reply(200, {});

  return movieLoader(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.GET_PROMO,
      payload: rebuildMovieData({})
    });
  });
});


it(`Should make a correct API call to /comments/:movieId`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const movieLoader = Operation.getReviews(4);

  apiMock.onGet(`/comments/4`).reply(200, []);

  return movieLoader(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.GET_REVIEWS,
      payload: []
    });
  });
});

it(`Reducer should load movies from the server`, () => {
  expect(reducer({
    films: [],
    promo: {},
    reviews: []
  }, {
    type: ActionType.GET_MOVIES,
    payload: films,
  })).toEqual({
    reviews: [],
    films,
    promo: {},
  });
});

it(`Reducer should load promo movie from the server`, () => {
  expect(reducer({
    reviews: [],
    films: [],
    promo: {},
  }, {
    type: ActionType.GET_PROMO,
    payload: movie,
  })).toEqual({
    reviews: [],
    films: [],
    promo: movie
  });
});

it(`Reducer should load movie comments from the server`, () => {
  expect(reducer({
    reviews: [],
    films: [],
    promo: {},
  }, {
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews: [
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
    ],
    films: [],
    promo: {}
  });
});

const mockState = {
  DATA: {
    "films": [
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
    ],
    "promo": {},
    "review": []
  },
  STATE: {
    genre: `genre 2`,
    showedMovies: 8,
  }
};

it(`Should return array of films of specific genre`, () => {
  expect(filterMoviesByGenre(mockState)).toStrictEqual([
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
    }
  ]);
});

