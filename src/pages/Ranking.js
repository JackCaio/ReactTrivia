import React from 'react';
import propTypes from 'prop-types';

// Ajustar ao final
const rankingsMock = [
  { name: 'player1', score: 100, picture: '4675ee57486c6ab9507d64d763ffd4f3' },
  { name: 'player2', score: 40, picture: '4675ee57486c6ab9507d64d763ffd4f3' },
  { name: 'player3', score: 80, picture: '4675ee57486c6ab9507d64d763ffd4f3' },
  { name: 'player4', score: 50, picture: '4675ee57486c6ab9507d64d763ffd4f3' },
];

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    // const storedRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = rankingsMock.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  backHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.backHome }
        >
          Início
        </button>
        <section>
          <ol>
            {
              ranking.map((player, index) => (
                <li key={ `i${index}` }>
                  <div>
                    <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="avatar" />
                    <span data-testid={ `player-name-${index}` }>
                      {`-${player.name}-`}
                    </span>
                    <span data-testid={ `player-score-${index}` }>
                      {player.score}
                    </span>
                  </div>
                </li>
              ))
            }
          </ol>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Ranking;
