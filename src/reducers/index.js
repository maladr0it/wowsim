import { combineReducers } from 'redux'
import party, * as fromParty from './party'
import player, * as fromPlayer from './player'
import alerts from './alerts'

export default combineReducers({
  player,
  party,
  alerts,
})

const getTargetId = (state) => fromPlayer.getTargetId(state.player)
const getMember = (state, id) => fromParty.getMember(state.party, id)
export const getTarget = (state) => getMember(state, getTargetId(state))
