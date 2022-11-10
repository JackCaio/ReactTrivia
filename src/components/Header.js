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
    const { name, score } = this.props;
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
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
