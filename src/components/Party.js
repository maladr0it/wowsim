import React from 'react'

const Party = ({ players, handleClick }) => {
  const playerList = Object.keys(players).map((key =>
    <div key={key} onClick={() => handleClick(key, 100)}>
      {key} - {players[key].name} : {players[key].hp}
    </div>
  ))
  return (
    <div>
      {playerList}
    </div>
  )
}
export default Party
