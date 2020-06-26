import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      isPlaying: false
    };

    this.handleVideoPlay = this.handleVideoPlay.bind(this);
  }

  componentDidMount() {
    this.setState({isPlaying: this.props.autoplay});
  }

  handleVideoPlay() {
    const video = this.videoRef.current;

    if (video.paused) {
      video.play();
      this.setState({isPlaying: true});
    } else {
      video.pause();
      this.setState({isPlaying: false});
    }
  }

  render() {
    const {preview, autoplay, mute} = this.props;

    return (
      <video
        ref={this.videoRef}
        autoPlay={autoplay}
        muted={mute}
        onClick={this.handleVideoPlay}
        width="100%"
        height="175"
      >
        <source src={preview} />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  autoplay: PropTypes.bool.isRequired,
  mute: PropTypes.bool
};

export default VideoPlayer;
