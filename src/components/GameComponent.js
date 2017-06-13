import React from 'react'
import PartyContainer from '../containers/PartyContainer'
import PlayerContainer from '../containers/PlayerContainer'
import AlertsContainer from '../containers/AlertsContainer'

const GameComponent = ( { isRunning, startGame, stopGame }) => {
  const display = (isRunning) ?
    <div>
      <PartyContainer />
      <PlayerContainer />
      <AlertsContainer />
    </div>
    :
    <div>
      <PartyContainer />
      <PlayerContainer />
      <AlertsContainer />
    </div>
  return (
    <div>
      <button onClick={() => startGame()}>START</button>
      <button onClick={() => stopGame()}>STOP</button>
      {display}
    </div>
  )
}
export default GameComponent
