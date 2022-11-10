import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      countdown: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    window.setInterval(() => {
      this.setState((prev) => ({ countdown: prev.countdown - 1 }));
    }, ONE_SECOND);
  }

  render() {
    const { countdown } = this.state;
    return (
      <div>
        <span>{ countdown }</span>
      </div>
    );
  }
}

export default Timer;
