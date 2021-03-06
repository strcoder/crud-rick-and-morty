const reducer = (state, payload) => {
  switch (payload.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: payload.characters,
      };
    case 'SET_CHARACTER':
      return {
        ...state,
        character: payload.character,
      };
    case 'SET_DELETED_CHARACTER':
      return {
        ...state,
        deleted: payload.character,
      };
    case 'SET_CREATED_CHARACTER':
      return {
        ...state,
        created: payload.character,
      };
    case 'SET_NEXT_PAGE':
      return {
        ...state,
        nextPage: payload.nextPage,
      };
    case 'SET_ERROR': return state;
    default: return state;
  }
};

export default reducer;
