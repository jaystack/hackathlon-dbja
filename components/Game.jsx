import React, { Component } from 'react';
import { connect } from 'react-redux';
import { say } from '../lib/dealer';
import { nextGamePhase, takeBet, clearBet } from '../store/actions';

class Game extends Component {
  componentDidMount() {
    console.log('shuffle animation');
    this.props.nextPhase();
  }
  async componentWillReceiveProps(nextProps) {
    const phaseChanged = this.props.gamePhase !== nextProps.gamePhase;
    if (nextProps.gamePhase === 'shuffle') {
      // wait for animation
      // random speaking
      console.log('shuffle animation');
      this.props.nextPhase();
    } else if (nextProps.gamePhase === 'takeBet') {
      const lastResultChanged = this.props.lastSpeakResult.text !== nextProps.lastSpeakResult.text;
      if (nextProps.bet === null) {
        if (!lastResultChanged) {
          await say('take-bet'); // TODO variants
        } else {
          const { bet, check } = nextProps.lastSpeakResult;
          this.props.takeBet(bet, check);
        }
      } else {
        this.props.nextPhase();
      }
    } else if (nextProps.gamePhase === 'betTaken') {
      await say('bet-taken1'); // TODO variants
      this.props.nextPhase();
    } else if (phaseChanged && nextProps.gamePhase === 'result') {
      await say('result1'); // TODO variants
      this.props.clearBet();
    }
  }
  nextTurn() {
    this.props.nextPhase();
  }
  render() {
    return (
      <div>
        Game
        {this.props.gamePhase === 'result' && 
          <button onClick={() => this.nextTurn()} >Next round</button>
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  lastSpeakResult: state.lastSpeakResult,
  gamePhase: state.gamePhase,
  bet: state.bet,
  check: state.check,
});

const mapDispatchToProps = dispatch => ({
  nextPhase: () => dispatch(nextGamePhase()),
  takeBet: (bet, check) => dispatch(takeBet(bet, check)),
  clearBet: () => dispatch(clearBet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);