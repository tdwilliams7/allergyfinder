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
  allergies: [],
  contacts: [],
  doctors: [],
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
    case SIGNED_IN:
      return {
        ...state,
        signedIn: true,
        signingIn: false,
        loginError: false,
        user: action.payload.id,
        name: action.payload.name,
        pictureUrl: action.payload.pictureUrl,
        dob: action.payload.dob,
        allergies: action.payload.allergies,
        contacts: action.payload.contacts,
        doctors: action.payload.doctors
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
        allergies: [],
        contacts: [],
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
        pictureUrl: action.payload.profileUrl,
        dob: action.payload.dob,
        allergies: action.payload.allergies,
        contacts: action.payload.contacts,
        doctors: action.payload.doctors
      };
    default:
      return state;
  }
};
