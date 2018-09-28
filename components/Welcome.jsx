import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeGamePhase } from '../store/actions';
import { say } from '../lib/dealer';

class Welcome extends Component {
  componentDidMount() {
    say('first-welcome');
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.lastSpeakResult.text !== null) {
      if (this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text) {
        await say('greeting');
        this.props.nextPhase();
      }
    }
  }
  render() {
    return (
      <div>
        Say your name!
      </div>
    )
  }
}


const mapStateToProps = state => ({
  lastSpeakResult: state.lastSpeakResult,
});

const mapDispatchToProps = dispatch => ({
  nextPhase: () => dispatch(changeGamePhase('takeBet')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
