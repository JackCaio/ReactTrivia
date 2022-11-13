import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerDown } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      countdown: 30,
      timer: 0,
    };
  }

  componentDidMount() {
    this.runTimer();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    window.clearInterval(timer);
  }

  runTimer = () => {
    const ONE_SECOND = 1000;
    const { timeOut, dispatch } = this.props;
    const timer = window.setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 1) {
        dispatch(timerDown());
        this.setState((prev) => ({ countdown: prev.countdown - 1 }));
      } else {
        timeOut();
      }
    }, ONE_SECOND);
    this.setState({ timer });
  };

  render() {
    const { countdown } = this.state;
    return <p>{ countdown }</p>;
  }
}

Timer.propTypes = {
  timeOut: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Timer);
