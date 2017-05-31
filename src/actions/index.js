const evaluateCast = ( cast, state ) => {
  if (state.player.mp < cast.cost) {
    return {
      passed: false,
      error: {
        type: 'ERR_NOT_ENOUGH_MANA'
      }
    }
  }
  if (state.party[cast.targetId].hp < 650) {
    return {
      passed: false,
      error: {
        type: 'ERR_INVALID_TARGET'
      }
    }
  }
  return {
    passed: true,
  }
}
export const setTarget = (target) => ({
  type: 'TARGET_SET',
  target,
})
const startCast = (cast) => (dispatch) => {
  const timeoutId = setTimeout(() => dispatch(attemptCompleteCast(cast)), cast.castTime*1000)
  const startTime = new Date().getTime()
  dispatch({
    type: 'CAST_STARTED',
    cast: {...cast, timeoutId, startTime}
  })
}
const completeCast = (cast) => ({
  type: 'CAST_COMPLETED',
  cast,
})
const attemptCompleteCast = () => (dispatch, getState) => {
  const currentCast = getState().player.currentCast
  const castResult = evaluateCast(currentCast, getState())
  if (!castResult.passed) {

  } else {
    dispatch(completeCast(currentCast))
  }
}
export const attemptStartCast = (spell, targetId) => (dispatch, getState) => {
  const state = getState()
  if (state.player.currentCast) return
  const cast = { ...spell, targetId }
  const castResult = evaluateCast(cast, state)
  if (!castResult.passed) {
    dispatch(castResult.error)
  } else {
    dispatch(startCast(cast))
  }
}
export const cancelCast = (cast) => (dispatch) => {
  if (!cast) return
  clearTimeout(cast.timeoutId)
  dispatch({
    type: 'CAST_CANCELLED',
    cast,
  })
}
