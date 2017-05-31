const initialState = {
  messages: []
}
const alerts = (state = initialState, action) => {
  switch (action.type) {
    case 'ERR_NOT_ENOUGH_MANA': {
      const message = 'not enough mana!'
      return {
        ...state,
        messages: state.messages.concat(message)
      }
    }
    case 'ERR_INVALID_TARGET': {
      const message = 'your target is dead...'
      return {
        ...state,
        messages: state.messages.concat(message)
      }
    }
    default:
      return state
  }
}
export default alerts
