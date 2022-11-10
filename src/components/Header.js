import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    const img = JSON.parse(localStorage.getItem('ranking')).picture;
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
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
