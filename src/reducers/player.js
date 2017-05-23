const initialState = {
  targetId: undefined,
  castingTimer: undefined,
  currentSpell: undefined, // this is a function
}

const player = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SET_TARGET':
      const { target } = action
      return {
        ...state,
        targetId: target
      }
    case 'START_CAST':
      const { spell } = action
      return {
        ...state,
        castingTimer: setTimeout(spell, 1000)
      }
    default:
      return state
  }
}

export default player
