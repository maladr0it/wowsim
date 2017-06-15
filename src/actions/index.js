const evaluateCast = (cast, state) => {
  if (state.player.mp < cast.cost) {
    return {
      passed: false,
      reason: 'ERR_NOT_ENOUGH_MANA'
    }
  }
  if (!state.party.aliveMemberIds.includes(cast.targetId)) {
    return {
      passed: false,
      reason: 'ERR_INVALID_TARGET'
    }
  }
  return {
    passed: true,
  }
}
const startCast = (cast) => ({
  type: 'CAST_STARTED',
  cast
})
const cancelCast = (cast, reason) => ({
  type: 'CAST_CANCELLED',
  cast,
  reason
})
const completeCast = (cast) => ({
  type: 'CAST_COMPLETED',
  cast,
})
const tickMp = () => ({
  type: 'TICK_MP'
})
const damageTarget = (targetId, value) => ({
 type: 'TARGET_DAMAGED',
 targetId,
 value
})
const attackParty = () => (dispatch, getState) => {
  // aquire random target
  const state = getState()
  const validIds = state.party.aliveMemberIds
  if (validIds.length == 0) {
    dispatch(stopGame()) // game over.  this should clear every timer ID
  }
  // should have a start and complete attack
  const targetId = validIds[Math.floor(Math.random()*validIds.length)]
  const value = Math.floor(Math.random() * 100)
  const timeout = Math.random() * 1000
  dispatch(damageTarget(targetId, value))
  const attackTimeoutId = setTimeout(() => dispatch(attackParty()), timeout)
}
const attemptCompleteCast = () => (dispatch, getState) => {
  const currentCast = getState().player.currentCast
  const castResult = evaluateCast(currentCast, getState())
  if (!castResult.passed) {
    dispatch(cancelCast(currentCast, castResult.reason))
  } else {
    dispatch(completeCast(currentCast))
  }
}
export const handleKeydown = (event) => (dispatch, getState) => {
  dispatch(startGame())
}
export const startGame = () => (dispatch, getState) => {
  const state = getState()
  const mpIntervalId = setInterval(() => dispatch(tickMp()), 2000)
  dispatch({
    type: 'GAME_STARTED',
    mpIntervalId,
    // attackTimeoutId,
  })
  dispatch(attackParty())
}
export const stopGame= () => (dispatch, getState) => {
  clearInterval(getState().player.mpIntervalId)
  dispatch({
    type: 'GAME_STOPPED',
  })
}
export const setTarget = (target) => ({
  type: 'TARGET_SET',
  target,
})
export const attemptStartCast = (spell, targetId) => (dispatch, getState) => {
  const state = getState()
  // awkward here
  if (!state.game.isRunning || state.player.currentCast) return
  const cast = { ...spell, targetId }
  const castResult = evaluateCast(cast, state)
  if (!castResult.passed) {
    clearTimeout(cast.timeoutId)
    dispatch(cancelCast(cast, castResult.reason))
  } else {
    const timeoutId = setTimeout(() => dispatch(attemptCompleteCast(cast)), cast.castTime*1000)
    const startTime = new Date().getTime()
    dispatch(startCast({...cast, timeoutId, startTime}))
  }
}
export const attemptCancelCast = (cast, reason = 'CANCELLED_BY_USER') => (dispatch) => {
  if (!cast) return
  clearTimeout(cast.timeoutId)
  dispatch(cancelCast(cast, reason))
}
