import {
  SIGNING_IN,
  SIGNED_IN,
  CREATING_USER,
  USER_CREATED,
  EMAIL_DUP,
  LOGOUT,
  LOGIN_ERROR
} from '../actions/userActions';

const initialState = {
  user: null,
  pictureUrl: null,
  name: null,
  creatingUser: false,
  userCreated: false,
  signingIn: false,
  signedIn: false,
  dupUser: false,
  loginError: false
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
        pictureUrl: action.payload.pictureUrl
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
        user: null,
        name: null,
        pictureUrl: null,
        signedIn: false
      };
    case LOGIN_ERROR:
      return { ...state, loginError: true, signingIn: false };
    default:
      return state;
  }
};
