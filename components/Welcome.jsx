import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextGamePhase } from '../store/actions';
import { say } from '../lib/dealer';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTries: 0,
    }
  }
  componentDidMount() {
    say('first-welcome');
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.lastSpeakResult.text !== null) {
      if (this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text) {
        if (this.state.nameTries === 0) {
          await say('name-first');
          this.setState({ nameTries: 1 });
        } else {
          await say('name-second1');
          await say('name-second2');
          this.props.nextPhase();
        }
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
  nextPhase: () => dispatch(nextGamePhase()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
