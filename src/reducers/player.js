const initialState = {
  mp: 200,
  maxMp: 300,
  targetId: 1,
  currentCast : undefined,
  spells: {
    1: {
      name: 'Healing Touch',
      castTime: 2,
      cost: 60,
      value: 100,
    },
    2: {
      name: 'Regrowth',
      castTime: 1,
      cost: 99,
      value: 120,
    }
  }
}

export const getTargetId = (state) => state.targetId

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TARGET': {
      const { target } = action
      return {
        ...state,
        targetId: target
      }
    }
    case 'START_CAST': {
      const { spell, targetId, now } = action
      // used for rendering the cast-bar
      // and determining if player is already casting
      const currentCast = {
        targetId: targetId,
        startTime: now,
        duration: spell.castTime,
      }
      return {
        ...state,
        currentCast: currentCast
      }
    }
    case 'CANCEL_CAST' : {
      return {
        ...state,
        currentCast: undefined
      }
    }
    case 'CAST': {
      const { spell } = action
      return {
        ...state,
        currentCast: undefined,
        mp: state.mp - spell.cost,
      }
    }
    default:
      return state
  }
}

export default player
