export const ADD_USUARIO = 'ADD_USUARIO';
export const addUsuario = (name, email) => ({
  type: ADD_USUARIO,
  name,
  email,
});
