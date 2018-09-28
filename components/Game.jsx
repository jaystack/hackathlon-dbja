import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { say } from '../lib/dealer';
import { nextGamePhase, takeBet, clearBet, bookResult, letSpeak, setResult } from '../store/actions';
import { postBetResult } from '../lib/apiClient';

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
          await say('take-bet', true);
          this.props.letSpeak(true);
        } else {
          this.props.letSpeak(false);
          const { bet, check } = nextProps.lastSpeakResult;

          // figure out result
          let result = check;
          if (bet > 10) {
            result = _.difference(['red', 'blue', 'green'], [check])[_.random(0, 1)];
          }
          this.props.setResult(result);

          postBetResult(this.props.userName, bet, result === check);

          this.props.takeBet(bet, check);
        }
      } else {
        this.props.nextPhase();
      }
    } else if (nextProps.gamePhase === 'betTaken') {
      await say('bet-taken', true);
      this.props.nextPhase();
    } else if (nextProps.gamePhase === 'result') {
      if (phaseChanged) {
        const file = nextProps.result === nextProps.check ? 'result-won' : 'result-loose';
        await say(file, true);
        this.props.bookResult();
        this.props.clearBet();
      } else if (this.props.balance !== nextProps.balance) { // booked
        if (nextProps.balance < 0) {
          this.props.nextPhase();
        }
      }
    } else if (nextProps.gamePhase === 'gameOver') {
      await say('game-over-1');
      await say('game-over-2');
      await say('game-over-3');
    }
  }
  nextTurn() {
    this.props.nextPhase();
  }
  render() {
    return (
      <div>

        <div className="coin">{this.props.balance}</div>
        <div className="round">Round:</div>
        <div className="bet">Your bet:<br />{this.props.bet}</div>
        
        {(this.props.gamePhase === 'result' && this.props.balance > 0 && this.props.bet === null) && 

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
  balance: state.balance,
  result: state.result,
  userName: state.userName,
});

const mapDispatchToProps = dispatch => ({
  nextPhase: () => dispatch(nextGamePhase()),
  takeBet: (bet, check) => dispatch(takeBet(bet, check)),
  clearBet: () => dispatch(clearBet()),
  bookResult: () => dispatch(bookResult()),
  letSpeak: (_letSpeak) => dispatch(letSpeak(_letSpeak)),
  setResult: (result) => dispatch(setResult(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);