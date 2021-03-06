import axios from 'axios';

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const setCharacter = (character) => ({
  type: 'SET_CHARACTER',
  character,
});

export const setCharacters = (characters) => ({
  type: 'SET_CHARACTERS',
  characters,
});

export const setDeletedCharacter = (character) => ({
  type: 'SET_DELETED_CHARACTER',
  character,
});

export const setCreatedCharacter = (character) => ({
  type: 'SET_CREATED_CHARACTER',
  character,
});

export const setNextPage = (nextPage) => ({
  type: 'SET_NEXT_PAGE',
  nextPage,
});

export const getCharacters = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
    }).then(({ data }) => {
      dispatch(setNextPage(data.info.next));
      dispatch(setCharacters(data.results));
    }).catch((error) => {
      dispatch(setError(error));
    });
  }
}

export const getCharacter = ({ id }) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/character/${id}`,
    }).then(({ data }) => {
      dispatch(setCharacter(data));
    }).catch((error) => {
      dispatch(setError(error));
    });
  }
}

export const getNextPage = ({ characters, nextPage }) => {
  return (dispatch) => {
    axios({
      url: nextPage,
      method: 'GET',
    }).then(({ data }) => {
      const newCharacters = [...characters, ...data.results]
      dispatch(setNextPage(data.info.next));
      dispatch(setCharacters(newCharacters));
    }).catch((error) => {
      dispatch(setError(error));
    });
  }
}

export const updateCharacters = ({ characters }) => {
  return (dispatch) => {
    dispatch(setCharacters(characters));
  }
}

export const updateCharacter = ({ character }) => {
  return (dispatch) => {
    dispatch(setCharacter(character));
  }
}

export const deletedCharacter = ({ character }) => {
  return (dispatch) => {
    dispatch(setDeletedCharacter(character));
  }
}

export const createdCharacter = ({ character }) => {
  return (dispatch) => {
    dispatch(setCreatedCharacter(character));
  }
}
