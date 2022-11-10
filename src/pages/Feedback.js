import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const acertosMinimos = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < acertosMinimos ? 'Could be better...' : 'Well Done!'
          }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
