import React from 'react';

const CastBar = (props) => {
  const containerStyle = {
    width: '300px',
    height: '100px',
    background: '#EEEEEE',
  }

  const barStyle = {
    width: props.value+'%',
    height: '100%',
    background: '#FFF9C4'
  }

  const infoStyle = {
    width: 'inherit',
    position: 'fixed'
  }

  const info = (props.spell) ? props.spell.name : '';

  return (
    <div style={containerStyle}>
      <div style={infoStyle}>{info}</div>
      <div style={barStyle} />
    </div>
  );
};

export default CastBar;
