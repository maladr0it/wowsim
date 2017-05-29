const evaluateCast = (spell, targetId, state) => {
  if ((state.player.mp >= spell.cost) & (state.party[targetId].hp > 0)) {
    return true
  }
  return false
}
const cast = (spell, targetId) => ({
  type: 'CAST',
  spell,
  targetId
})

const attemptCast = (spell, targetId) => (dispatch, getState) => {
  if (evaluateCast(spell, targetId, getState())) {
    dispatch(cast(spell, targetId))
  } else {
    dispatch(cancelCast(spell, targetId))
  }
}
export const cancelCast = (spell, targetId) => ({
  type: 'CANCEL_CAST',
  spell,
  targetId
})
export const startCast = (spell, targetId) => (dispatch, getState) => {
  const state = getState()
  if (evaluateCast(spell, targetId, state) & !state.player.currentCast) {
    setTimeout(() => dispatch(attemptCast(spell, targetId)), spell.castTime*1000)
    dispatch(
      {
        type: 'START_CAST',
        spell: state.
        targetId,
        now: new Date().getTime()
      }
    )
  }
}
export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target,
})
