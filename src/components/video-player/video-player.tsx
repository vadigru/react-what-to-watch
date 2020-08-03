import * as React from "react";

interface Props {
  isPlaying: boolean;
  src: string;
  autoPlay: boolean;
}

class VideoPlayer extends React.PureComponent<Props> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this.videoRef.current;

    if (video) {
      video.src = src;
      video.muted = true;
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    if (video) {
      video.src = ``;
      video.muted = null;
    }
  }

  render() {
    const {src, autoPlay} = this.props;

    return (
      <video
        ref={this.videoRef}
        src={src}
        autoPlay={autoPlay}
        width="100%"
        height="175"
      />
    );
  }
}

export default VideoPlayer;
