import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './Header.css';

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
        <p>
          <img
            src={ `https://www.gravatar.com/avatar/${img}` }
            alt="foto do jogador"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{name}</span>
          <span>
            {'Score: '}
            <span data-testid="header-score">{score}</span>
            <span>Seu score foi de:</span>
            <span data-testid="feedback-total-score">{score}</span>
            <span>O número de perguntas corretas foi de:</span>
            <span data-testid="feedback-total-question">{assertions}</span>
          </span>
        </p>
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
