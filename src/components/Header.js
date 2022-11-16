import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './Header.css';
import starIcon from '../imgs/starIcon.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const img = md5(email).toString();
    this.setState({
      img,
    });
  }

  render() {
    const { name, score, assertions } = this.props;
    const { img } = this.state;
    return (
      <header>
        {/* <div className="player-container"> */}
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${img}` }
            alt="foto do jogador"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name" className="player-name">{name}</p>
        </div>
        <div>
          <img src={ starIcon } alt="Icone de estrela" className="starIcon" />
          <div className="game-data">
            <p>
              {'Pontos: '}
              <span data-testid="header-score">{score}</span>
            </p>
            <p>
              <span>Acertos: </span>
              <span data-testid="feedback-total-question">{assertions}</span>
            </p>
          </div>
        </div>
        {/* </div> */}
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Header);
