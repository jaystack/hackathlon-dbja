import React, { Component } from 'react';

class Welcome extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  render() {
    return (
      <div>
        Say your name!
      </div>
    )
  }
}


export default Welcome;