import { GET_ALLERGIES, GOT_ALLERGIES } from '../actions/allergyActions';

const initialState = {
  allergies: [],
  gettingAllergies: false,
  receivedAllergies: false
};

export const allergyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLERGIES:
      return { ...state, gettingAllergies: true };
    case GOT_ALLERGIES:
      action.payload.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        receivedAllergies: true,
        allergies: action.payload
      };
    default:
      return state;
  }
};
