import React from 'react';

const PlayerFrame = (props) => {

  const containerStyle = {
    display: 'flex',
    width: '300px',
    height: '100px',
    background: '#EEEEEE',
    overflow: 'visible',
  };

  const barStyle = {
    flex: 'none',
    width: props.hpPerc+'%',
    height: '100%',
    background: '#9CCC65',
  };

  const incHealStyle = {
    flex: 'none',
    width: props.incHpPerc+'%',
    height: '100%',
    background: '#DCEDC8',
  };

  const infoStyle = {
    width: 'inherit',
    position: 'absolute'
  };

  return (
    <div onMouseEnter={props.onMouseEnter} style={containerStyle}>
      <div style={infoStyle}>
        <div style={{float: 'left'}}>
          <div>{props.name}</div>
        </div>
        <div style={{float: 'right'}}>
          {props.missingHp}
        </div>
      </div>
      <div style={barStyle} />
      <div style={incHealStyle} />
    </div>
  );
};

export default PlayerFrame;
