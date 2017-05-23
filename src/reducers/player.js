const initialState = {
  targetId: undefined,
  isCasting: 'NAH',
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
      return {
        ...state,
        isCasting: 'YE'
      }
    default:
      return state
  }
}

export default player
