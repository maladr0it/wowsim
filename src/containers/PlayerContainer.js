import React from 'react'
import { connect } from 'react-redux'

import { hurtTarget } from '../actions'
import { startCast } from '../actions'
import { finishCast } from '../actions'

import PlayerComponent from '../components/PlayerComponent'

const PlayerContainer = ({
  targetId,
  startCast,
  finishCast,
  hurtTarget}) => (
  <PlayerComponent targetId={targetId} onCastClick={()=>startCast(()=>finishCast())} />
)



const mapStateToProps = (state) => ({
  targetId: state.player.targetId,
  isCasting: state.player.isCasting
})

export default connect(
  mapStateToProps,
  { startCast, finishCast, hurtTarget }
)(PlayerContainer)
