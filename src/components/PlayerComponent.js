import React from 'react'
import CastBar from './CastBar'

const mpBarContainerStyle = {
  display: 'flex',
  width: '300px',
  height: '50px',
  background: '#EEEEEE',
}
const mpBarStyle = {
  flex: 'none',
  height: '100%',
  background: '#B3E5FC',
}
const mpInfoStyle = {
  width: 'inherit',
  position: 'absolute'
}
const castBarContainerStyle = {
  display: 'flex',
  width: '300px',
  height: '50px',
  background: '#EEEEEE',
}

const Player = ({ player, target,
  attemptStartCast, attemptCancelCast }) => {
  const mpPerc = player.mp / player.maxMp * 100
  const mpBar = (
    <div style={mpBarContainerStyle}>
      <div style={{...mpBarStyle, width: mpPerc+"%"}} />
      <div style={mpInfoStyle}>
        {player.mp} / {player.maxMp}
      </div>
    </div>
  )
  const castBar = (
    <div style={castBarContainerStyle}>
      {(player.currentCast) ?
        <CastBar
          spellName={player.currentCast.name}
          startTime={player.currentCast.startTime}
          duration={player.currentCast.castTime}
        /> : <div />
      }
    </div>
  )
  const spellBar = Object.keys(player.spells).map((key =>
    <button
      key={key}
      onClick={() => attemptStartCast(player.spells[key], player.targetId)}>
      {player.spells[key].name} : {player.spells[key].cost}
    </button>
  ))
  return (
    <div>
      {mpBar}
      {spellBar}
      <button onClick={() => attemptCancelCast(player.currentCast)}>CANCEL</button>
      {castBar}
      <div>target: {target.name}</div>
    </div>
  )
}

export default Player
