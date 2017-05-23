import React from 'react'
import { connect } from 'react-redux'

import { hurtTarget } from '../actions'
import { startCast } from '../actions'

const PlayerContainer = ({ targetId, isCasting, startCast, hurtTarget }) => (
  <div>
    <button onClick={() => startCast()}>CAST</button>
    <button onClick={() => hurtTarget(targetId, 129)}>HURT</button>
    {targetId}{isCasting}
  </div>
)



const mapStateToProps = (state) => ({
  targetId: state.player.targetId,
  isCasting: state.player.isCasting
})

export default connect(
  mapStateToProps,
  { startCast, hurtTarget }
)(PlayerContainer)
