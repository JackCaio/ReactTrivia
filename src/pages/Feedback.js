import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playAgain } from '../redux/actions';

class Feedback extends Component {
  newGame = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  seeRanking = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/ranking');
  };

  render() {
    const { assertions } = this.props;
    const acertosMinimos = 3;
    return (
      <div>
        <Header />
        <br />
        <p data-testid="feedback-text">
          {
            assertions < acertosMinimos ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.newGame }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.seeRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
