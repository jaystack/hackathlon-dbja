import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import speak from '../lib/speaker';
import { speakResult } from '../store/actions';


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
        </Head>
        <div>
          <div>
            header
          </div>
          <div>
            {this.props.children}  
          </div>
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
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => ({
  // counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  speakResult: (result) => dispatch(speakResult(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
