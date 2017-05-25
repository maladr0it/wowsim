const initialState = {
  1: {
    name: 'SAULTEIE',
    hp: 421,
  },
  2: {
    name: "MITTEE",
    hp: 659,
  },
}

const playerList = (state = initialState, action) => {
  switch (action.type) {
    case 'HURT_TARGET':
      const { target, value } = action
      state[target].hp -= value
      return {
        ...state
      }
    case 'CAST':
      const { spell } = action
      state[spell.target].hp += spell.heal
      return {
        ...state,
      }
    default:
      return state
  }
}

export default playerList
