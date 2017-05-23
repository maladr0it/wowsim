export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target: target,
})

export const startCast = () => ({
  type: 'START_CAST',
})

export const hurtTarget = (target, dmg) => {
  if (target) {
    return {
      type: 'HURT_PLAYER',
      target: target,
      value: dmg,
    }
  }
  return {
    type: 'NO_TARGET'
  }
}
