import React from 'react'

const PlayerComponent = ({ targetId, castProgress, onCastClick, onStopClick }) => {
  const containerStyle = {
    width: '100px',
    height: '50px',
    background: '#EEEEEE',
  }
  const barStyle = {
    width: castProgress+'%',
    height: '100%',
    background: '#B3E5FC',
  }

  return (
    <div>
      <button onClick={onCastClick}>CAST</button>
      <button onClick={onStopClick}>STOP</button>
      target: {targetId}
      <div style={containerStyle}>
        <div style={barStyle} />
      </div>
    </div>
  )
}

export default PlayerComponent
