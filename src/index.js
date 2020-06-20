import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const FilmData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const init = () => {
  ReactDom.render(
      <App
        title={FilmData.TITLE}
        genre={FilmData.GENRE}
        year={FilmData.YEAR}
        movies={films}
      />,
      document.querySelector(`#root`)
  );
};

init();
