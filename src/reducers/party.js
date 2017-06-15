const initialState = {
  aliveMemberIds: [],
  members: {
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
}

export const getMember = (state, id) => state.members[id]

const party = (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_STARTED': {
      const aliveMemberIds = Object.keys(state.members)
      return {
        ...state,
        aliveMemberIds
      }
    }
    case 'CAST_STARTED': {
      const { cast } = action
      let target = state.members[cast.targetId]
      target.incHeal += cast.value
      return {
        ...state,
        members: {
          ...state.members,
          [cast.targetId]: target
        }
      }
    }
    case 'CAST_COMPLETED': {
      const { cast } = action
      let target = state.members[cast.targetId]
      if (target.hp + cast.value > target.maxHp) {
        target.hp = target.maxHp
      } else {
        target.hp += cast.value
      }
      target.incHeal -= cast.value
      return {
        ...state,
        members: {
          ...state.members,
          [cast.targetId]: target
        }
      }
    }
    case 'CAST_CANCELLED': {
      const { cast } = action
      let target = state.members[cast.targetId]
      target.incHeal -= cast.value
      return {
        ...state,
        members: {
          ...state.members,
          [cast.targetId]: target
        }
      }
    }
    case 'TARGET_DAMAGED': {
      const { targetId, value } = action
      let target = state.members[targetId]
      let aliveMemberIds = state.aliveMemberIds
      if (target.hp - value <= 0) {
        target.hp = 0
        aliveMemberIds = aliveMemberIds.filter((id) => {
          return id != targetId
        })
      } else {
        target.hp -= value
      }
      return {
        ...state,
        aliveMemberIds: aliveMemberIds,
        members: {
          ...state.members,
          [targetId]: target
        }
      }
    }
    default:
      return state
  }
}
export default party
