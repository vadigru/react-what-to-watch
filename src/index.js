import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import App from "./components/app/app.jsx";
import withActiveCard from "./hocs/with-active-card/with-active-card.jsx";
import films from "./mocks/films.js";

const AppWrapped = withActiveCard(App);
const FilmData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
);

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <AppWrapped
          promoTitle={FilmData.TITLE}
          promoGenre={FilmData.GENRE}
          promoYear={FilmData.YEAR}
          movies={films}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
