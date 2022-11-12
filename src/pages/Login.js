import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import ConfigButton from '../components/ConfigButton';
import getToken from '../services/tokenApi';
import { addUsuario } from '../redux/actions';
import './Login.css';
import image from '../imgs/image.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  buttonEnable = () => {
    const { name, email } = this.state;
    const isNameValid = name.length !== 0;
    const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const isEmailValid = pattern.test(email);
    return isNameValid && isEmailValid;
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  startGame = async () => {
    const { email, name } = this.state;
    const { history, dispatch } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    const hash = md5(email).toString();
    const obj = { name, score: 0, picture: hash };
    let oldRanking = [];
    if (localStorage.getItem('ranking') !== null) {
      oldRanking = JSON.parse(localStorage.getItem('ranking'));
    }
    localStorage.setItem('ranking', JSON.stringify([...oldRanking, obj]));
    dispatch(addUsuario(name, email));
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <>
        <img src={ image } alt="Logo Trivia" className="trivia-logo" />
        <div className="login-container">
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Qual é o seu nome?"
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="Qual é o seu e-mail do gravatar?"
            value={ email }
            onChange={ this.onInputChange }
          />
          <div className="button-container">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ !this.buttonEnable() }
              onClick={ this.startGame }
            >
              Play
            </button>
            <ConfigButton history={ history } />
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
