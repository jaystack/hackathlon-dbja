import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Welcome from '../components/Welcome';
import Game from '../components/Game';
import GameOver from '../components/GameOver';
import apiClient from '../lib/apiClient';
import {
  counterIncrease,
  counterDecrease,
  counterSteps,
} from '../store/actions';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'welcome'
    }
  }
  // static async getInitialProps() {
  //   const greetingFromApi = await apiClient.getGreeting();
  //   return {
  //     greetingFromApi,
  //   };
  // }
  speak() {

  }

  getBody() {
    console.log(this.state.phase)
    switch (this.state.phase) {
      case 'welcome' : return <Welcome />;
      case 'game' : return <Game />;
      case 'gameOver' : return <GameOver />;
      default: return this.state.phase;
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
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  increase: () => dispatch(counterIncrease()),
  decrease: () => dispatch(counterDecrease()),
  steps: () => dispatch(counterSteps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
