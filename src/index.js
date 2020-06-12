import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const FilmData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

const init = () => {
  ReactDom.render(
      <App
        title = {FilmData.TITLE}
        genre = {FilmData.GENRE}
        year = {FilmData.YEAR}
        movies = {MOVIES}
      />,
      document.querySelector(`#root`)
  );
};

init();
