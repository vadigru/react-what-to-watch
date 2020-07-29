import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {PrivateRoute} from "./private-route.jsx";

import {AuthorizationStatus} from "../reducer/user/user.js";
import {AppRoute} from "../const.js";
import history from "../history";

it(`Should render PrivateRoute component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore();

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <PrivateRoute
              render={() => {}}
              path={AppRoute.ROOT}
              exact
              authorizationStatus={AuthorizationStatus.NO_AUTH}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
