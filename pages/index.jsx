import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Layout from '../components/Layout';
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
  static async getInitialProps() {
    const greetingFromApi = await apiClient.getGreeting();
    return {
      greetingFromApi,
    };
  }

  render() {
    return (
      <div>
        Helloka
      </div>
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

export default
withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(
    Index,
  ),
);
