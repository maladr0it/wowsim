import React from 'react'

const Party = ({ members, setTarget }) => {
  const containerStyle = {
    display: 'flex',
    overflow: 'visible',
    width: '300px',
    height: '100px',
    background: '#EEEEEE',
  }
  const barStyle = {
    flex: 'none',
    height: '100%',
    background: '#9CCC65',
  }
  const incHealStyle = {
    flex: 'none',
    height: '100%',
    background: '#DCEDC8',
  }
  const infoStyle = {
    width: 'inherit',
    position: 'absolute'
  }

  const memberList = Object.keys(members).map((key => {
    const member = members[key]
    const percHp = (member.hp / member.maxHp) * 100
    const incHealPerc = (member.incHeal / member.maxHp) * 100
    return (
      <div style={containerStyle} key={key} onMouseEnter={() => setTarget(key)}>
        <div style={{...barStyle, width: percHp+'%'}} />
        <div style={{...incHealStyle, width: incHealPerc+'%'}} />
        <div style={infoStyle}>
          {key} - {members[key].name} : {members[key].hp}
        </div>
      </div>
    )}
  ))
  return (
    <div>
      {memberList}
    </div>
  )
}
export default Party
