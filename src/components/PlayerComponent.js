import React from 'react'

const PlayerComponent = ({ targetId, onCastClick }) => {
  return (
    <div>
      <button onClick={onCastClick}>CAST</button>
      target: {targetId}
    </div>
  )
}

export default PlayerComponent
