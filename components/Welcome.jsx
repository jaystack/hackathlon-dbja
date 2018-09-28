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
    await say('welcome-1');
    await say('welcome-2');
    await say('welcome-3');
    await say('welcome-4');
    await say('welcome-5');
    await say('welcome-6');
    this.props.letSpeak(true);
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.lastSpeakResult.text !== null) {
      if (this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text) {
        this.props.letSpeak(false);
        if (this.state.nameTries === 0) {
          await say('name-first-1');
          await say('name-first-2');
          this.setState({ nameTries: 1 });
          this.props.letSpeak(true);
        } else {
          await say('name-second-1');
          await say('name-second-2');
          const newUser = await createUser("dumbhead1");
          this.props.userCreated(newUser);
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
  userCreated: (user) => dispatch(userCreated(user)),
  letSpeak: (_letSpeak) => dispatch(letSpeak(_letSpeak)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
