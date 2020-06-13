import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const FilmData = {
  TITLE: `The Dark Knight`,
  GENRE: `Action`,
  YEAR: 2008
};

const MOVIES = [`2001: A Space Odyssey`, `Requiem for a Dream`, `Batman Begins`];

it(`Should movie tilte be pressed`, () => {
  const movieTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        title={FilmData.TITLE}
        genre={FilmData.GENRE}
        year={FilmData.YEAR}
        movies={MOVIES}
        onMovieTitleClick={movieTitleClickHandler}
      />
  );

  const movieTitle = main.find(`h3.small-movie-card__title`).at(0);

  movieTitle.props().onClick();

  expect(movieTitleClickHandler.mock.calls.length).toBe(1);
});
