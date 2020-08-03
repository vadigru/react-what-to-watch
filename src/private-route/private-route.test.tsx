import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import {PrivateRoute} from "./private-route";

import {AuthorizationStatus} from "../reducer/user/user";
import {AppRoute} from "../const";
import history from "../history";
import {noop} from "../utils/common";

it(`Should render PrivateRoute component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore();

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <PrivateRoute
              render={noop}
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
