export const ADD_USUARIO = 'ADD_USUARIO';
export const addUsuario = (name, email) => ({
  type: ADD_USUARIO,
  name,
  email,
});

export const TIMER_DOWN = 'TIMER_DOWN';
export const timerDown = () => ({
  type: TIMER_DOWN,
});

export const ADD_POINTS = 'ADD_POINTS';
export const addPoints = (points) => ({
  type: ADD_POINTS,
  points,
});

export const RESET_TIMER = 'RESET_TIMER';
export const resetTimer = () => ({
  type: RESET_TIMER,
});
