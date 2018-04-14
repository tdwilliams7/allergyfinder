import {
  SIGNING_IN,
  SIGNED_IN,
  CREATING_USER,
  USER_CREATED,
  EMAIL_DUP,
  LOGOUT,
  LOGIN_ERROR,
  UPDATING_USER,
  USER_UPDATED
} from '../actions/userActions';

const initialState = {
  user: '',
  pictureUrl: '',
  name: '',
  dob: '',
  creatingUser: false,
  userCreated: false,
  signingIn: false,
  signedIn: false,
  dupUser: false,
  loginError: false,
  updatingUser: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return { ...state, signingIn: true };
    case SIGNED_IN: // add jwt
      return {
        ...state,
        signedIn: true,
        signingIn: false,
        loginError: false,
        user: action.payload.id,
        name: action.payload.name,
        pictureUrl: action.payload.pictureUrl,
        dob: action.payload.dob
      };
    case CREATING_USER:
      return { ...state, creatingUser: true };
    case USER_CREATED:
      return {
        ...state,
        userCreated: true,
        creatingUser: false,
        dupUser: false
      };
    case EMAIL_DUP:
      return { ...state, dupUser: true, creatingUser: false };
    case LOGOUT:
      return {
        ...state,
        user: '',
        name: '',
        pictureUrl: '',
        dob: '',
        signedIn: false
      };
    case LOGIN_ERROR:
      return { ...state, loginError: true, signingIn: false };
    case UPDATING_USER:
      return {
        ...state,
        updatingUser: true
      };
    case USER_UPDATED:
      return {
        ...state,
        updatingUser: false,
        user: action.payload.id,
        name: action.payload.name,
        pictureUrl: action.payload.pictureUrl,
        dob: action.payload.dob
      };
    default:
      return state;
  }
};
