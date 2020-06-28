import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      isPlaying: props.isPlaying
    };

    this.handleVideoPlay = this.handleVideoPlay.bind(this);
  }

  componentDidMount() {
    const {src, autoPlay} = this.props;
    const video = this.videoRef.current;

    if (video) {
      video.src = src;
      video.autoPlay = autoPlay;
      video.muted = true;
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    if (video) {
      video.src = ``;
      video.autoPlay = null;
      video.muted = null;
    }
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
    const {src, autoPlay} = this.props;

    return (
      <video
        ref={this.videoRef}
        src={src}
        autoPlay={autoPlay}
        onClick={this.handleVideoPlay}
        width="100%"
        height="175"
      >
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired
};

export default VideoPlayer;
