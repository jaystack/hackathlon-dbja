import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import speak from '../lib/speaker';
import { speakResult, reset } from '../store/actions';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSpeaking: false,
    }
  }
  async speak() {
    await this.setState({ isSpeaking: true });
    const result = await speak();
    this.props.speakResult(result);
    await this.setState({ isSpeaking: false });
  }
  render() {
    return (
      <div>
        <Head>
          <title>Game title</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="/static/style.css" />
          <link href="https://vjs.zencdn.net/7.1.0/video-js.css" rel="stylesheet" />
          <script src="https://vjs.zencdn.net/ie8/ie8-version/videojs-ie8.min.js"></script>
        </Head>
        <div>
          <div>
            header
            <p>{this.props.userName}</p>
          </div>

          <div>
            <div className="left-panel">
              left panel
            </div>
            <div>
              {this.props.children}  
            </div>
            <div className="right-panel">
             right panel
            </div>
          </div>

          <video id="my-video" className="video-js" preload="auto" width="640" height="264"
            poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
            <source src="/static/Anim1-1.mp4" type='video/mp4' />
              {/* <source src="MY_VIDEO.webm" type='video/webm' /> */}
                <p className="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
          </video>


          <div>
            footer
            <button
              onClick={() => this.speak()}
              disabled={this.state.isSpeaking}
            >
              Speak
            </button>
            {this.state.isSpeaking &&
              <span>...</span>
            }
            <button
              onClick={() => this.props.reset()}
            >
              Reset game
            </button>
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => ({
   userName: state.userName,
});

const mapDispatchToProps = dispatch => ({
  speakResult: (result) => dispatch(speakResult(result)),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
