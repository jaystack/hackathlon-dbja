import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeGamePhase } from '../store/actions';

class Welcome extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.lastSpeakResult.text !== null) {
      if (this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text) {
        this.props.nextPhase();
      }
    }
  }
  render() {
    console.log(this.props)
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
