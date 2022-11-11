import { TIMER_DOWN, RESET_TIMER, PLAY_AGAIN } from '../actions';

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

  case RESET_TIMER:
    return {
      ...state,
      timer: initialState.timer,
    };

  case PLAY_AGAIN:
    return { ...initialState };

  default:
    return state;
  }
}

export default timerReducer;
