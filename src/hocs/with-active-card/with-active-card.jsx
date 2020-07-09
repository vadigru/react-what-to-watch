import React from "react";

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeMovieCard: null
      };

      this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
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
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
