import { ADD_POINTS, ADD_USUARIO } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = initialState, action) {
  switch (action.type) {
  case ADD_USUARIO:
    return { ...state, name: action.name, gravatarEmail: action.email };
  case ADD_POINTS:
    return { ...state,
      score: state.score + action.points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
