import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getAvatar} from "../../reducer/user/selectors.js";

import {AppRoute} from "../../const.js";

const UserBlock = (props) => {
  const {avatarUrl, authorizationStatus} = props;

  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </div>) : (<Link to={AppRoute.SIGN_IN} className="user-block__link">
        Sign in
      </Link>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatar(state),
});

UserBlock.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

export {UserBlock};
export default connect(mapStateToProps, null)(UserBlock);
