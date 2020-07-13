import React from "react";

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeMovieCard: null,
        isBigPlayerActive: false
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
      return () => this.setState(
          {activeMovieCard: movie}
      );
    }

    render() {
      const {activeMovieCard} = this.state;

      return (
        <Component
          {...this.props}
          activeMovieCard={activeMovieCard}
          onMovieCardClick={this._handleMovieCardClick}
          onBigPlayerOnOff={this._handleBigPlayerOnOff}
          isBigPlayerActive={this.state.isBigPlayerActive}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
