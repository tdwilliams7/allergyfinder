import {
  SIGNING_IN,
  SIGNED_IN,
  CREATING_USER,
  USER_CREATED,
  EMAIL_DUP
} from '../actions/userActions';

const initialState = {
  user: null,
  pictureUrl: null,
  name: null,
  creatingUser: false,
  userCreated: false,
  signingIn: false,
  signedIn: false,
  dupUser: false
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
    default:
      return state;
  }
};
