import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/state/state.js";

import {AppRoute} from "../../const.js";
import history from "../../history.js";

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      // this.state = {
      //   isBigPlayerActive: false,
      // };

      this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
      // this._handleBigPlayerOnOff = this._handleBigPlayerOnOff.bind(this);
    }

    // _handleBigPlayerOnOff() {
    //   this.setState({
    //     isBigPlayerActive: !this.state.isBigPlayerActive
    //   });
    // }

    _handleMovieCardClick(id) {
      const {getReviews, changeSelectedMovieId} = this.props;
      return () => {
        getReviews(id);
        changeSelectedMovieId(id);
        history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
      };
    }

    render() {
      // const {isBigPlayerActive} = this.state;

      return (
        <Component
          {...this.props}
          // isBigPlayerActive={isBigPlayerActive}
          onMovieCardClick={this._handleMovieCardClick}
          // onBigPlayerOnOff={this._handleBigPlayerOnOff}
        />
      );
    }
  }

  WithActiveCard.propTypes = {
    getReviews: PropTypes.func.isRequired,
    changeSelectedMovieId: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    changeSelectedMovieId(id) {
      dispatch(ActionCreator.changeSelectedMovieId(id));
    }
  });

  return connect(null, mapDispatchToProps)(WithActiveCard);
};

export default withActiveCard;
