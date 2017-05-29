const initialState = {
  1: {
    name: 'SAULTEIE',
    hp: 421,
    maxHp: 600,
    incHeal: 0,
  },
  2: {
    name: "MITTEE",
    hp: 659,
    maxHp: 800,
    incHeal: 0,
  },
}

export const getMember = (state, id) => state[id]

const party = (state = initialState, action) => {
  switch (action.type) {
    case 'START_CAST': {
      const { spell, targetId } = action
      let target = state[targetId]
      target.incHeal += spell.value
      return {
        ...state,
        [targetId]: target
      }
    }
    case 'CAST': {
      const { spell, targetId } = action
      let target = state[targetId]
      let newHp = target.hp + spell.value
      if (newHp > target.maxHp) {
        newHp = target.maxHp
      }
      target.hp = newHp
      target.incHeal -= spell.value
      return {
        ...state,
        [targetId]: target
      }
    }
    case 'CANCEL_CAST': {
      const { spell, targetId } = action
      let target = state[targetId]
      target.incHeal -= spell.value
      return {
        ...state,
        [targetId]: target
      }
    }
    default:
      return state
  }
}

export default party
