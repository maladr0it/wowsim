import React from 'react';

const PlayerFrame = (props) => {
  const hpPerc = props.player.hp/props.player.maxHp * 100;
  const incHealPerc = props.player.incHp/props.player.maxHp * 100;
  const missingHp = props.player.hp + props.player.incHp - props.player.maxHp;

  const containerStyle = {
    display: 'flex',
    width: '300px',
    height: '100px',
    background: '#EEEEEE',
    overflow: 'visible',
  };

  const barStyle = {
    flex: 'none',
    width: hpPerc+'%',
    height: '100%',
    background: '#9CCC65',
  };

  const incHealStyle = {
    flex: 'none',
    width: incHealPerc+'%',
    height: '100%',
    background: '#DCEDC8',
  };

  const infoStyle = {
    width: 'inherit',
    position: 'fixed'
  };

  return (
    <div onMouseEnter={props.onMouseEnter} style={containerStyle}>
      <div style={infoStyle}>
        <div style={{float: 'left'}}>
          <div>{props.player.name}</div>
          <div>{props.player.hp}/{props.player.maxHp}</div>
          <div>{hpPerc.toFixed(0)}%</div>
        </div>
        <div style={{float: 'right'}}>{missingHp}</div>
      </div>
      <div style={barStyle} />
      <div style={incHealStyle} />
    </div>
  );
};

export default PlayerFrame;
