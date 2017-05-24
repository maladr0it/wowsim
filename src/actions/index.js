export const setTarget = (target) => ({
  type: 'SET_TARGET',
  target,
})

export const setIsCasting = (bool) => ({
  type: 'SET_IS_CASTING',
  bool
})

export const setProgress = (value) => ({
  type: 'SET_PROGRESS',
  value

})

export const hurtTarget = (target, dmg) => {
  return {
    type: 'HURT_TARGET',
    target,
    value: dmg,
  }
}

export const startCast = () => (dispatch, getState) => {
  if (!getState().player.isCasting) {
    dispatch(setIsCasting(true))
    dispatch(updateCast(20))
  }
}

export const updateCast = (period, progress=0) => (dispatch, getState) => {
  if (getState().player.isCasting) {
    dispatch(setProgress(progress))
    progress += 1
    setTimeout(() => dispatch(updateCast(period, progress)), period)
  }
}

export const stopCast = () => (dispatch) => {
  dispatch(setIsCasting(false))
}
