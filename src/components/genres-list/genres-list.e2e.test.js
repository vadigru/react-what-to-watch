import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import GenresList from "./genres-list.jsx";
import {ALL_GENRES} from "../../const.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  activeTab: `Drama`,
  tabNames: [`Drama`, `Adventure`, `Crime`],
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
  }
];

const preventEvent = {
  preventDefault() {}
};

it(`Should tab be clicked`, () => {
  const store = mockStore({
    genre: ALL_GENRES,
    films,
  });

  const changeGenre = jest.fn();
  const showDefaultMovies = jest.fn();

  const tabs = mount(
      <Provider store={store}>
        <GenresList
          movies={films}
          activeTab={ALL_GENRES}
          onTabClick={changeGenre(mock.activeTab)}
          onGenreTabClick={showDefaultMovies}
        />
      </Provider>
  );

  const tabName = tabs.find(`a.catalog__genres-link`).first();

  tabName.simulate(`click`, preventEvent);
  expect(changeGenre.mock.calls.length).toBe(1);
  expect(changeGenre.mock.calls[0][0]).toBe(mock.tabNames[0]);
});
