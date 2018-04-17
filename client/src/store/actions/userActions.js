import axios from 'axios';
export const CREATE_USER = 'CREATE_USER';
export const SIGNED_IN = 'SIGN_IN';
export const SIGNING_IN = 'SIGNING_IN';
export const CREATING_USER = 'CREATING_USER';
export const USER_CREATED = 'USER_CREATED';
export const EMAIL_DUP = 'EMAIL_DUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const UPDATING_USER = 'UPDATING_USER';
export const USER_UPDATED = 'USER_UPDATED';

const token = window.localStorage.getItem('Authorization');
const backendURL = 'http://localhost:8080';

export const logIn = (email, password) => {
  return dispatch => {
    if (token && !email) {
      dispatch({ type: SIGNING_IN });
      axios
        .post(`/users/login`, { token })
        .then(({ data }) => {
          dispatch({ type: SIGNED_IN, payload: data });
        })
        .catch(err => {
          const errorCode = err.response.status;
          if (errorCode === 422) {
            dispatch({ type: LOGIN_ERROR });
          }
        });
    } else {
      dispatch({ type: SIGNING_IN });
      axios
        .post(`/users/login`, { email, password })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          dispatch({ type: SIGNED_IN, payload: data });
        })
        .catch(err => {
          console.log('status code error', err);
          const errorCode = err.response.status;
          if (errorCode === 422) {
            dispatch({ type: LOGIN_ERROR });
          }
        });
    }
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
      .post(`/users/signUp`, { name, email, password })
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

export const updateUser = updatedInfo => {
  return dispatch => {
    dispatch({ type: UPDATING_USER });
    axios
      .patch(`/users/profile/update`, {
        token,
        updatedInfo
      })
      .then(({ data }) => {
        dispatch({ type: USER_UPDATED, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addAllergyToUser = allergy => {
  return dispatch => {
    dispatch({ type: UPDATING_USER });
    axios
      .patch(`/users/profile/allergy`, {
        token,
        allergy
      })
      .then(({ data }) => {
        dispatch({ type: USER_UPDATED, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addDoctorToUser = doctor => {
  return dispatch => {
    dispatch({ type: UPDATING_USER });
    axios
      .patch(`/users/profile/doctor`, { token, doctor })
      .then(({ data }) => {
        dispatch({ type: USER_UPDATED, payload: data });
      })
      .catch(err => console.log(err));
  };
};

export const addContactToUser = contact => {
  return dispatch => {
    dispatch({ type: UPDATING_USER });
    axios
      .patch(`/users/profile/contact`, { token, contact })
      .then(({ data }) => {
        dispatch({ type: USER_UPDATED, payload: data });
      })
      .catch(err => console.log(err));
  };
};
