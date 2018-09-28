import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextGamePhase, userCreated, letSpeak } from '../store/actions';
import { say } from '../lib/dealer';
import { createUser } from '../lib/apiClient';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTries: 0,
    }
  }
  async componentDidMount() {
    await say('first-welcome');
    this.props.letSpeak(true);
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.lastSpeakResult.text !== null) {
      if (this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text) {
        this.props.letSpeak(false);
        if (this.state.nameTries === 0) {
          await say('name-first');
          this.setState({ nameTries: 1 });
          this.props.letSpeak(true);
        } else {
          await say('name-second1');
          await say('name-second2');
          await createUser("dumbhead1");
          this.props.userCreated("dumbhead1");
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
  userCreated: (userName) => dispatch(userCreated(userName)),
  letSpeak: (_letSpeak) => dispatch(letSpeak(_letSpeak)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
