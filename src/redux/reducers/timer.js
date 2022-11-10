import { TIMER_DOWN } from '../actions';

const initialState = {
  timer: 30,
};

function timerReducer(state = initialState, action) {
  switch (action.type) {
  case TIMER_DOWN:
    return {
      ...state,
      timer: state.timer - 1,
    };
  default:
    return state;
  }
}

export default timerReducer;
