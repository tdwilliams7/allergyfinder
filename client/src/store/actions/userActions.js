import axios from 'axios';
export const CREATE_USER = 'CREATE_USER';
export const SIGNED_IN = 'SIGN_IN';
export const SIGNING_IN = 'SIGNING_IN';
export const CREATING_USER = 'CREATING_USER';
export const USER_CREATED = 'USER_CREATED';
export const EMAIL_DUP = 'EMAIL_DUP';

export const logIn = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGNING_IN });
    axios
      .post('http://localhost:8080/users/login', { email, password })
      .then(({ data }) => {
        dispatch({ type: SIGNED_IN, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
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
