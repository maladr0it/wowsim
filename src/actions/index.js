export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target: target,
})

export const startCast = (spell) => ({
  type: 'START_CAST',
  spell: spell,
})

export const finishCast = () => ({
  type: 'FINISH_CAST',
})

export const hurtTarget = (target, dmg) => {
  return {
    type: 'HURT_TARGET',
    target: target,
    value: dmg,
  }
}

// export const updateCast = () => {
//   type: 'UPDATE_CAST',
// }
