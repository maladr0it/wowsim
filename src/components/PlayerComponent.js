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

const PlayerComponent = ({ player, target, startCast, cancelCast }) => {
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
          spellName='SPELL'
          startTime={player.currentCast.startTime}
          duration={player.currentCast.duration}
          spellName
        /> : <div />
      }
    </div>
  )
  // const castBar = (player.castStartTime) ?
  //   <CastBar
  //     spellName='SPELL'
  //     startTime={player.castStartTime}
  //     duration={player.castDuration}
  //     spellName
  //   /> : <div />
  const spellBar = Object.keys(player.spells).map((key =>
    <button
      key={key}
      onClick={() => startCast(player.spells[key], player.targetId)}>
      {player.spells[key].name} : {player.spells[key].cost}
    </button>
  ))
  return (
    <div>
      {mpBar}
      {spellBar}
      {castBar}
      <div>target: {target.name}</div>
      <button onClick={()=>cancelCast()}>CANCEL</button>
    </div>
  )
}

export default PlayerComponent
