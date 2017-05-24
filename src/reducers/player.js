const initialState = {
  targetId: undefined,
  isCasting: false,
  castProgress: 0,
}

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TARGET':
      const { target } = action
      return {
        ...state,
        targetId: target
      }
    case 'SET_IS_CASTING':
      return {
        ...state,
        castProgress: 0,
        isCasting: action.bool,
      }
    case 'SET_PROGRESS':
      return { ...state, castProgress: action.value}
    default:
      return state
  }
}

export default player
