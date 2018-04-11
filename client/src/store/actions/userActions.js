import axios from 'axios';
export const CREATE_USER = 'CREATE_USER';
export const SIGNED_IN = 'SIGN_IN';
export const SIGNING_IN = 'SIGNING_IN';
export const CREATING_USER = 'CREATING_USER';
export const USER_CREATED = 'USER_CREATED';
export const EMAIL_DUP = 'EMAIL_DUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const token = window.localStorage.getItem('Authorization');

export const logIn = (email, password) => {
  return dispatch => {
    console.log(token);
    dispatch({ type: SIGNING_IN });
    axios
      .post('http://localhost:8080/users/login', { email, password })
      .then(({ data }) => {
        console.log({ data });
        window.localStorage.setItem('Authorization', data.token);
        dispatch({ type: SIGNED_IN, payload: data });
      })
      .catch(err => {
        const errorCode = err.response.status;
        if (errorCode === 422) {
          dispatch({ type: LOGIN_ERROR });
        }
      });
  };
};

export const logOut = () => {
  return dispatch => {
    window.localStorage.removeItem('Authorization');
    dispatch({ type: LOGOUT });
  };
};

export const newUser = (name, email, password) => {
  return dispatch => {
    dispatch({ type: CREATING_USER });
    axios
      .post('http://localhost:8080/users/signUp', { name, email, password })
      .then(({ data }) => {
        dispatch({ type: USER_CREATED });
      })
      .catch(err => {
        const errorCode = err.response.data.err.code;
        if (errorCode === 11000) {
          dispatch({ type: EMAIL_DUP });
        }
      });
  };
};
