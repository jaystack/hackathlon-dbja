import React, { Component } from 'react';
import { say } from '../lib/dealer';

class Game extends Component {
  componentDidMount() {
    say('take-bet');
  }
  render() {
    return (
      <div>
        Game
      </div>
    )
  }
}


export default Game;