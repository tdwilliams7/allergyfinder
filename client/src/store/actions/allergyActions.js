import axios from 'axios';
export const GET_ALLERGIES = 'GET_ALLERGIES';
export const GOT_ALLERGIES = 'GOT_ALLERGIES';

const backendURL = 'http://localhost:8080';

export const getAllergies = () => {
  return dispatch => {
    dispatch({ type: GET_ALLERGIES });
    axios
      .get(`${backendURL}/allergy`)
      .then(({ data }) => {
        dispatch({ type: GOT_ALLERGIES, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
