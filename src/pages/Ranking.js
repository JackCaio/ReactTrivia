import React from 'react';
import propTypes from 'prop-types';
import './Ranking.css';
import image from '../imgs/image.png';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const storedRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = storedRanking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  backHome = () => {
    const { history } = this.props;
    history.push('/ReactTrivia');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div className="ranking-container">
        <img src={ image } alt="trivia game logo" className="logo" />
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          <ol>
            {
              ranking.map((player, index) => (
                <li key={ `i${index}` }>
                  <div>
                    <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="avatar" className="avatar" />
                    <span data-testid={ `player-name-${index}` } className="player-name">
                      {`${player.name}`}
                    </span>
                    <span data-testid={ `player-score-${index}` } className="score">
                      {player.score}
                    </span>
                  </div>
                </li>
              ))
            }
          </ol>
        </section>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.backHome }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Ranking;
