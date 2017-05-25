const initialState = {
  target: 1,
  isCasting: false,
  spellTimer: undefined,
  mp: 800,
  currentSpell: {
    name: 'HEALING TOUCH',
    target: 2,
    heal: 400,
    cost: 229,
  },
}

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TARGET':
      return {
        ...state,
        target: action.target
      }
    case 'START_CAST':
      if (!state.isCasting) {
        return {
          ...state,
          isCasting: true,
          spellTimer: setTimeout(action.onFinish, 1000),
        }
      } else {
        return state
      }
    case 'STOP_CAST':
      clearTimeout(state.spellTimer)
      return {
        ...state,
        isCasting: false,
        spellTimer: undefined,
      }
    case 'CAST':
      const { spell } = action
      return {
        ...state,
        isCasting: false,
        spellTimer: undefined,
        mp: state.mp - spell.cost
      }
    default:
      return state
  }
}

export default player
