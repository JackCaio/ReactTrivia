import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameScreen from '../components/GameScreen';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div className="game-container">
          <GameScreen history={ history } />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
