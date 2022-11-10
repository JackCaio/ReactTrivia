import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  backHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
};

export default Ranking;
