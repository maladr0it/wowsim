const initialState = {
  mp: 200,
  maxMp: 300,
  targetId: "1",
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
    case 'TARGET_SET': {
      const { target } = action
      return {
        ...state,
        targetId: target
      }
    }
    case 'CAST_STARTED': {
      const { cast } = action
      return {
        ...state,
        currentCast: cast
      }
    }
    case 'CAST_CANCELLED' : {
      return {
        ...state,
        currentCast: undefined
      }
    }
    case 'CAST_COMPLETED': {
      const { cast } = action
      return {
        ...state,
        currentCast: undefined,
        mp: state.mp - cast.cost,
      }
    }
    default:
      return state
  }
}

export default player
