import React from 'react'
import { connect } from 'react-redux'

import { startCast } from '../actions'
import { stopCast } from '../actions'
import { cast } from '../actions'
import { hurtTarget } from '../actions'

import PlayerComponent from '../components/PlayerComponent'

const PlayerContainer = ({
  target, mp, targetObj, currentSpell, startCast, stopCast, cast
  }) => (
  <PlayerComponent
    targetId={target}
    onCastClick={()=>startCast(() => cast(currentSpell))}
    onStopClick={()=>stopCast()}
    mp={mp}
    targetHp={targetObj.hp}
  />
)

const targetById = (party, id) => {
  return party[id]
}

// FUCK YES! we can now access state of other reducers!!!

const mapStateToProps = (state) => ({
  target : state.player.target,
  targetObj : targetById(state.party, state.player.target),
  mp : state.player.mp,
  currentSpell : state.player.currentSpell
})
export default connect(
  mapStateToProps,
  { startCast, stopCast, cast, hurtTarget }
)(PlayerContainer)
