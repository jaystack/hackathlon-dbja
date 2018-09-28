import React, { Component } from 'react';
import { connect } from 'react-redux';
import { say } from '../lib/dealer';
import { nextGamePhase } from '../store/actions';

class Game extends Component {
  componentDidMount() {
    console.log('shuffle animation');
    this.props.nextPhase();
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.gamePhase === 'shuffle') {
      // wait for animation
      // random speaking
      console.log('shuffle animation');
      this.props.nextPhase();
    } else if (nextProps.gamePhase === 'takeBet') {
      if (this.props.lastSpeakResult.text === nextProps.lastSpeakResult.text) {
        await say('take-bet'); // TODO variants
      } else {
        this.props.nextPhase();
      }
    } else if (nextProps.gamePhase === 'betTaken') {
      await say('bet-taken1'); // TODO variants
      this.props.nextPhase();
    } else if (nextProps.gamePhase === 'result') {
      await say('result1'); // TODO variants
      this.props.nextPhase();
    }
  }
  render() {
    return (
      <div>
        Game
      </div>
    )
  }
}


const mapStateToProps = state => ({
  lastSpeakResult: state.lastSpeakResult,
  gamePhase: state.gamePhase,
});

const mapDispatchToProps = dispatch => ({
  nextPhase: () => dispatch(nextGamePhase()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);