import React from 'react';

const ManaBar = (props) => {
  const mpPerc = props.mp / props.maxMp * 100;

  const containerStyle = {
    width: '300px',
    height: '50px',
    background: '#EEEEEE',
  };
  const barStyle = {
    width: mpPerc+'%',
    height: '100%',
    background: '#B3E5FC',
  };
  const infoStyle = {
    width: 'inherit',
    position: 'fixed'
  };
  return (
    <div style={containerStyle}>
      <div style={infoStyle}>
        {props.mp}/{props.maxMp}
      </div>
      <div style={barStyle} />
    </div>
  );
};

export default ManaBar;
