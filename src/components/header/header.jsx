import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import UserBlock from "../user-block/user-block.jsx";

import {getAvatar} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";

const Header = (props) => {
  const {avatarUrl} = props;

  return (
    <header className={`${`page-header`} ${!avatarUrl ? `user-page__head` : `movie-card__head`}`}>
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <UserBlock avatarUrl={avatarUrl} /* onSignInClick={onSignInClick}*/ />

    </header>
  );
};

const mapStateToProps = (state) => ({
  avatarUrl: getAvatar(state)
});

Header.propTypes = {
  avatarUrl: PropTypes.string.isRequired
};

export {Header};
export default connect(mapStateToProps, null)(Header);
