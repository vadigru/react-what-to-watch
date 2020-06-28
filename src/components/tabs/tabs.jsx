import React, {PureComponent} from "react";
import {Tab} from "../../const.js";
import movieType from "../../prop-types/types.js";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: Tab.OVERVIEW
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabName) {
    return () => this.setState({
      activeTab: tabName
    });
  }

  render() {
    const {movie} = this.props;
    const {reviews} = movie;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item ${this.state.activeTab === Tab.OVERVIEW ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={this.handleTabClick(Tab.OVERVIEW)}>Overview</a>
            </li>
            <li className={`movie-nav__item ${this.state.activeTab === Tab.DETAILS ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={this.handleTabClick(Tab.DETAILS)}>Details</a>
            </li>
            <li className={`movie-nav__item ${this.state.activeTab === Tab.REVIEWS ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={this.handleTabClick(Tab.REVIEWS)}>Reviews</a>
            </li>
          </ul>
        </nav>

        {this.state.activeTab === Tab.OVERVIEW &&
          <MovieOverview movie={movie}/>
        }

        {this.state.activeTab === Tab.DETAILS &&
          <MovieDetails movie={movie} />
        }

        {this.state.activeTab === Tab.REVIEWS &&
          <MovieReviews reviews={reviews} />
        }

      </div>
    );
  }
}

Tabs.propTypes = {
  movie: movieType.isRequired
};

export default Tabs;
