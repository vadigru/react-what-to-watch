import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {poster, preview} = this.props;
    return (
      <video poster={poster} autoPlay muted width="100%">
        <source src={preview} />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default VideoPlayer;
