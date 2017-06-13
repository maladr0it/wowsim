const initialState = {
  messages: []
}
const handleMessage = (type) => {
  switch (type) {
    case 'ERR_NOT_ENOUGH_MANA': {
      return 'You don\'t have enough mana!'
    }
    default:
      return 'Cancelled'
  }
}
const alerts = (state = initialState, action) => {
  switch (action.type) {
    case 'CAST_CANCELLED': {
      const { reason } = action
      const errorMessage = handleMessage(reason)
      return {
        ...state,
        messages: state.messages.concat(errorMessage)
      }
    }
    default:
      return state
  }
}
export default alerts
