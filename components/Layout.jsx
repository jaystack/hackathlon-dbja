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
        <div className="bg">
          <div>
            header
            <p>{this.props.userName}</p>
          </div>

          {this.props.children}

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
