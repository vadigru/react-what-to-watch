import {getTextedRating, formatTime, formatMovieTime, getMaxGenresCount, getGenresList, rebuildMovieData} from "./common.js";

const films = [
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 2`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 3`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 4`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 5`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 6`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 7`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 8`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 9`,
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
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie genre 10`,
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
  },
];

const movie = {
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
  "preview_image": `img/the-grand-budapest-hotel.jpg`,
  "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
  "background_color": `#ffffff`,
  "video_link": `https://some-link`,
  "preview_video_link": `https://some-link`,
  "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  "rating": 8.9,
  "scores_count": 240,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  "run_time": 99,
  "genre": `Comedy`,
  "released": 2014,
  "is_favorite": false
};

const outputMovie = {
  title: movie.name,
  posterUrl: movie.poster_image,
  backgroundUrl: movie.background_image,
  backgroundColor: movie.background_color,
  previewUrl: movie.preview_video_link,
  previewImage: movie.preview_image,
  genre: movie.genre,
  release: movie.released,
  director: movie.director,
  starring: movie.starring,
  time: formatMovieTime(movie.run_time),
  rating: movie.rating,
  votes: movie.scores_count,
  description: movie.description,
  id: movie.id,
  isFavorite: movie.is_favorite,
  videoUrl: movie.video_link,
};

const testValues = {
  BAD: 1.5,
  NORMAL: 4,
  GOOD: 7,
  VERY_GOOD: 9,
  AWESOME: 10
};

it(`Should test switch statment`, () => {
  expect(getTextedRating(testValues.BAD)).toBe(`Bad`);
  expect(getTextedRating(testValues.NORMAL)).toBe(`Normal`);
  expect(getTextedRating(testValues.GOOD)).toBe(`Good`);
  expect(getTextedRating(testValues.VERY_GOOD)).toBe(`Very good`);
  expect(getTextedRating(testValues.AWESOME)).toBe(`Awesome`);
});

it(`Should return formatted time`, () => {
  expect(formatTime(30)).toBe(`00:00:30`);
  expect(formatTime(60)).toBe(`00:01:00`);
  expect(formatTime(3600)).toBe(`01:00:00`);
});

it(`Should return formatted movie duration`, () => {
  expect(formatMovieTime(30)).toBe(`0h 30m`);
  expect(formatMovieTime(115)).toBe(`1h 55m`);
  expect(formatMovieTime(180)).toBe(`3h 00m`);
});

it(`Should return a list of nine genres plus "All genres"`, () => {
  expect(getMaxGenresCount(getGenresList(films))).toStrictEqual(
      [
        `All genres`,
        `Movie genre`,
        `Movie genre 2`,
        `Movie genre 3`,
        `Movie genre 4`,
        `Movie genre 5`,
        `Movie genre 6`,
        `Movie genre 7`,
        `Movie genre 8`,
        `Movie genre 9`,
      ]
  );
});

it(`Should return rebuilded movie data`, () => {
  expect(rebuildMovieData(movie)).toStrictEqual(outputMovie);
});


