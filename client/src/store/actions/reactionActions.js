import axios from 'axios';
export const GET_REACTIONS = 'GET_REACTIONS';
export const GOT_REACTIONS = 'GOT_REACTIONS';

const backendURL = 'http://localhost:8080';

export const getReactions = () => {
  return dispatch => {
    dispatch({ type: GET_REACTIONS });
    axios
      .get(`${backendURL}/reaction`)
      .then(({ data }) => {
        dispatch({ type: GOT_REACTIONS, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
