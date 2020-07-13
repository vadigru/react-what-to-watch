import {getTextedRating, getMoviesByGenre, formatTime} from "./common.js";

const movie = {
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
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
};

const films = [
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
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
    genre: `Movie Genre 2`,
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

it(`Should return specific genre`, () => {
  expect(getMoviesByGenre(`Movie Genre`, films)).toStrictEqual([movie]);
});

it(`Should return formatted time`, () => {
  expect(formatTime(60)).toBe(`00:01:00`);
  expect(formatTime(3600)).toBe(`01:00:00`);
});
