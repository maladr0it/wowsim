import React from 'react'
import { connect } from 'react-redux'

// import { hurtTarget } from '../actions'
import { startCast } from '../actions'
import { stopCast } from '../actions'

import PlayerComponent from '../components/PlayerComponent'

const PlayerContainer = ({
  targetId,
  castProgress,
  startCast,
  stopCast,
  }) => (
  <PlayerComponent
    targetId={targetId}
    castProgress={castProgress}
    onCastClick={()=>startCast()}
    onStopClick={()=>stopCast()}
  />
)
// onCastClick={()=>startCast(1)}

const mapStateToProps = (state) => ({
  targetId: state.player.targetId,
  castProgress: state.player.castProgress,
})


export default connect(
  mapStateToProps,
  { startCast, stopCast }
)(PlayerContainer)
