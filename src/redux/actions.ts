import axios from 'axios';

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const setCharacters = (characters) => ({
  type: 'SET_CHARACTERS',
  characters,
});

export const getCharacters = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
    }).then(({ data }) => {
      dispatch(setCharacters(data.results));
    }).catch((error) => {
      dispatch(setError(error));
    });
  }
}
