import React from 'react';

// lists all spells
const Hotbar = (props) => {
  const items = props.items.map((item, i) =>
    <img src={item.spell.icon}
      key={i}
      onClick={()=>props.actionHandler(item.spell)}
    />
  );

  return (
    <div>
      {items}
    </div>
  );
};

export default Hotbar;
