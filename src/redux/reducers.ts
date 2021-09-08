const reducer = (state, payload) => {
  switch (payload.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: payload.characters,
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
