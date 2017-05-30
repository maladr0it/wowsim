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
      const { cast } = action
      let target = state[cast.targetId]
      let newHp = target.hp + cast.value
      if (newHp > target.maxHp) {
        newHp = target.maxHp
      }
      target.hp = newHp
      target.incHeal -= cast.value
      return {
        ...state,
        [cast.targetId]: target
      }
    }
    case 'CANCEL_CAST': {
      const { cast } = action
      let target = state[cast.targetId]
      target.incHeal -= cast.value
      return {
        ...state,
        [cast.targetId]: target
      }
    }
    default:
      return state
  }
}

export default party
