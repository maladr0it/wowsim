import React from 'react';
import PlayerFrame from '../components/PlayerFrame'

class Player extends React.Component {
  // what is a player?
  //
  constructor(props) {
    super(props);
    this.state = {
      pulse: true
    }
  }

  render() {
    const props = this.props
    const hpPerc = props.hp/props.maxHp* 100;
    const incHpPerc = props.incHp/props.maxHp * 100;
    const missingHp = props.hp + props.incHp - props.maxHp;

    return(
      <PlayerFrame
        name={props.name}
        hpPerc={hpPerc}
        incHpPerc={incHpPerc}
        missingHp={missingHp}
        onMouseEnter={props.handleMouseEnter}
      />
    );
  }
}

export default Player;
