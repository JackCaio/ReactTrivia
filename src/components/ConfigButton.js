import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ConfigButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('/ReactTrivia/configs') }
      >
        Config
      </button>
    );
  }
}

ConfigButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
