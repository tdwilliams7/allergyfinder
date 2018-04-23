import { GET_REACTIONS, GOT_REACTIONS } from '../actions/reactionActions';

const initialState = {
  reactions: [],
  gettingReactions: false,
  receivedReactions: false
};

export const reactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REACTIONS:
      return { ...state, gettingReactions: true };
    case GOT_REACTIONS:
      return {
        ...state,
        gettingReactions: false,
        receivedReactions: true,
        reactions: action.payload
      };
    default:
      return state;
  }
};
