import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// lists all spells
const Hotbar = (props) => {
  const spells = props.spells.map((spell, i) =>
    <RaisedButton label={spell.name} />
  );

  return (
    <div>
      {spells}
    </div>
  );
};

export default Hotbar;
