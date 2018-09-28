import React, { Component } from 'react';
import { connect } from 'react-redux';
import { say } from '../lib/dealer';
import { nextGamePhase, takeBet, clearBet, bookResult } from '../store/actions';

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
    } else if (nextProps.gamePhase === 'result') {
      if (phaseChanged) {
        await say('result1'); // TODO variants
        this.props.bookResult();
        this.props.clearBet();
      } else if (this.props.balance !== nextProps.balance) { // booked
        if (nextProps.balance < 0) {
          this.props.nextPhase();
        }
      }
      
    }
  }
  nextTurn() {
    this.props.nextPhase();
  }
  render() {
    return (
      <div>
        <div className="coin">13</div>

        <div className="round">Round: 1</div>

        Game
        <br />
        Balance: {this.props.balance}<br />
        Your bet: {this.props.bet}
        <br />
        {(this.props.gamePhase === 'result' && this.props.balance > 0) && 
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
  balance: state.balance
});

const mapDispatchToProps = dispatch => ({
  nextPhase: () => dispatch(nextGamePhase()),
  takeBet: (bet, check) => dispatch(takeBet(bet, check)),
  clearBet: () => dispatch(clearBet()),
  bookResult: () => dispatch(bookResult()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);