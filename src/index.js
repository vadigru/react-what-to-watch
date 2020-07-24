import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import withActiveCard from "./hocs/with-active-card/with-active-card.jsx";
import {createAPI} from "./api.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {composeWithDevTools} from "redux-devtools-extension";

const AppWithActiveCard = withActiveCard(App);

const onUnauthorized = () => {
  store.dispatch(
      ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
  );
};

const getMovieReviews = (movieId) => {
  store.dispatch(
      DataOperation.getReviews(movieId)
  );
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.getMovies());
store.dispatch(DataOperation.getPromo());
store.dispatch(UserOperation.checkAuth());

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <AppWithActiveCard
          getReviews={getMovieReviews}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
