import * as React from "react";
import {connect} from "react-redux";
import {Route, Redirect, RouteComponentProps} from "react-router-dom";

import {AuthorizationStatus} from "../reducer/user/user.js";
import {getAuthorizationStatus} from "../reducer/user/selectors.js";

import {AppRoute} from "../const.js";

interface Props {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<number> | null) => void;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          render(routeProps)
        ) : (
          <Redirect to={AppRoute.SIGN_IN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
