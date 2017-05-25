export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target,
})

export const hurtTarget = (target, dmg) => {
  return {
    type: 'HURT_TARGET',
    target,
    value: dmg,
  }
}

export const startCast = (onFinish) => {
  return {
    type: "START_CAST",
    onFinish,
  }
}

export const stopCast = () => {
  return {
    type: "STOP_CAST"
  }
}

export const cast = (spell) => {
  return {
    type: "CAST",
    spell
  }
}

export const evaluateCast = () => (dispatch) => {
  dispatch()
}
// usefuckoff big thunk?
