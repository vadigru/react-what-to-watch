import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

import {AuthorizationStatus} from "../reducer/user/user.js";
import {getAuthorizationStatus} from "../reducer/user/selectors.js";

import {AppRoute} from "../const.js";

const PrivateRoute = (props) => {
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

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);