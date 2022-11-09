import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ConfigButton from '../components/ConfigButton';

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

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          placeholder="nome"
          onChange={ this.onInputChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          placeholder="email "
          value={ email }
          onChange={ this.onInputChange }

        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ !this.buttonEnable() }
        >
          Play
        </button>
        <ConfigButton history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
