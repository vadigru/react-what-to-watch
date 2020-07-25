import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus, getAvatar} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const UserBlock = (props) => {
  const {avatarUrl, onSignInClick, authorizationStatus} = props;

  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </div>) : (<a onClick={onSignInClick} href="#" className="user-block__link">
        Sign in
      </a>
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
  authorizationStatus: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export {UserBlock};
export default connect(mapStateToProps, null)(UserBlock);
