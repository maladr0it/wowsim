const initialState = {
  isRunning: false,
}

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_STARTED': {
      return {
        ...state,
        isRunning: true
      }
    }
    case 'GAME_STOPPED': {
      return {
        ...state,
        isRunning: false
      }
    }
    default:
      return state
  }
}

export default game
