import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import withActiveCard from "./hocs/with-active-card/with-active-card.jsx";
import {createAPI} from "./api.js";
import {Operation} from "./reducer/data/data.js";
import {composeWithDevTools} from "redux-devtools-extension";

const AppWrapped = withActiveCard(App);

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.getMovies());
store.dispatch(Operation.getPromo());

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <AppWrapped />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
