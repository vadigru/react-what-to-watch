import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {getSelectedMovie} from "../../reducer/state/selectors.js";

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeMovieCard: null,
        isBigPlayerActive: false,
      };

      this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
      this._handleBigPlayerOnOff = this._handleBigPlayerOnOff.bind(this);
    }

    _handleBigPlayerOnOff() {
      this.setState({
        isBigPlayerActive: !this.state.isBigPlayerActive
      });
    }

    _handleMovieCardClick(movie) {
      return () => {
        this.props.getReviews(movie);
        this.props.changeSelectedMovieId(movie.id);
        this.setState({
          activeMovieCard: movie
        });
      };
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
        />
      );
    }
  }

  WithActiveCard.propTypes = {
    getReviews: PropTypes.func.isRequired,
    changeSelectedMovieId: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    selectedMovie: getSelectedMovie(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    changeSelectedMovieId(id) {
      dispatch(ActionCreator.changeSelectedMovieId(id));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveCard);
};

export default withActiveCard;
