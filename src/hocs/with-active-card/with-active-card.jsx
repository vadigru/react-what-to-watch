import React from "react";
import PropTypes from "prop-types";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {connect} from "react-redux";

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeMovieCard: null,
        isBigPlayerActive: false,
        isSignIn: false
      };

      this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
      this._handleBigPlayerOnOff = this._handleBigPlayerOnOff.bind(this);
      this._handleSignInClick = this._handleSignInClick.bind(this);
      this._handleSubmitClick = this._handleSubmitClick.bind(this);
    }

    _handleBigPlayerOnOff() {
      this.setState({
        isBigPlayerActive: !this.state.isBigPlayerActive
      });
    }

    _handleMovieCardClick(movie) {
      return () => {
        this.props.getReviews(movie.id);
        this.setState({
          activeMovieCard: movie
        });
      };
    }

    _handleSignInClick() {
      this.setState({
        isSignIn: true,
      });
    }

    _handleSubmitClick(authData) {
      const {login} = this.props;
      this.setState({
        isSignIn: false,
      });
      login(authData);
    }

    render() {
      const {activeMovieCard, isBigPlayerActive, isSignIn} = this.state;

      return (
        <Component
          {...this.props}
          isSignIn={isSignIn}
          isBigPlayerActive={isBigPlayerActive}
          activeMovieCard={activeMovieCard}
          onMovieCardClick={this._handleMovieCardClick}
          onBigPlayerOnOff={this._handleBigPlayerOnOff}
          onSignInClickHandler={this._handleSignInClick}
          onSubmitClick={this._handleSubmitClick}
        />
      );
    }
  }

  WithActiveCard.propTypes = {
    login: PropTypes.func.isRequired,
    getReviews: PropTypes.func.isRequired
  };

  const mapDispatchToProps = (dispatch) => ({
    login(authData) {
      dispatch(UserOperation.login(authData));
    }
  });

  return connect(null, mapDispatchToProps)(WithActiveCard);
};

export default withActiveCard;
