import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Welcome from '../components/Welcome';
import Game from '../components/Game';
import GameOver from '../components/GameOver';
import apiClient from '../lib/apiClient';
import {

} from '../store/actions';
// a


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // phase: 'welcome'
    }
  }
  // static async getInitialProps() {
  //   const greetingFromApi = await apiClient.getGreeting();
  //   return {
  //     greetingFromApi,
  //   };
  // }


  getBody() {
    switch (this.props.gamePhase) {
      case 'welcome' : return <Welcome />;
      case 'takeBet' :
      case 'betTaken' :
      case 'shuffle' :
      case 'result' : return <Game />;
      case 'gameOver' : return <GameOver />;
      default: return this.props.gamePhase;
    }
  }

  render() {
    return (
      <Layout>
        {this.getBody()}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  gamePhase: state.gamePhase,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
