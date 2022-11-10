import React from 'react';
import propTypes from 'prop-types';

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
    const { timeOut } = this.props;
    const timer = window.setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 0) {
        this.setState((prev) => ({ countdown: prev.countdown - 1 }));
      } else {
        timeOut();
      }
    }, ONE_SECOND);
    this.setState({ timer });
  };

  render() {
    const { countdown } = this.state;
    return (
      <div>
        <span>{ countdown }</span>
      </div>
    );
  }
}

Timer.propTypes = {
  timeOut: propTypes.func.isRequired,
};

export default Timer;
