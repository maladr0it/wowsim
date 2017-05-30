const evaluateCast = (cast, state) => {
  if ((state.player.mp >= cast.cost) & (state.party[cast.targetId].hp > 0)) {
    return true
  }
  return false
}
const cast = (cast) => ({
  type: 'CAST',
  cast,
})
const attemptCast = () => (dispatch, getState) => {
  const currentCast = getState().player.currentCast
  if (evaluateCast(currentCast, getState())) {
    dispatch(cast(currentCast))
  } else {
    dispatch(cancelCast(currentCast))
  }
}
export const cancelCast = (cast) => (dispatch) => {
  if (cast) {
    clearTimeout(cast.timeoutId)
    dispatch({
      type: 'CANCEL_CAST',
      cast,
    })
  }
}
export const startCast = (spell, targetId) => (dispatch, getState) => {
  const state = getState()
  if (evaluateCast({...spell, targetId}, state) & !state.player.currentCast) {
    const timeoutId = setTimeout(() => dispatch(attemptCast()), spell.castTime*1000)
    dispatch(
      {
        type: 'START_CAST',
        spell,
        targetId,
        timeoutId,
        now: new Date().getTime()
      }
    )
  }
}
export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target,
})
