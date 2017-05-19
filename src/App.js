import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import CastBar from './Components/CastBar';
import PlayerFrame from './Components/PlayerFrame';
import ManaBar from './Components/ManaBar';
import Hotbar from './Components/Hotbar'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCasting: false,
      castBarProgress: 0,
      spellTarget: 0,
      currentSpell: null,
      mp: 400,
      maxMp: 500,
      spells: [
        {
          name: 'Healing Touch',
          value: 150,
          cost: 200,
          castTime: 1.5,
        },
        {
          name: 'Regrowth',
          value: 200,
          cost: 400,
          castTime: 2,
        }
      ],
      players: [
        {
          name: 'Saulty',
          hp: 200,
          maxHp: 400,
          incHp: 0,
          isAlive: true,
        },
        {
          name: 'Oom',
          hp: 5,
          maxHp: 400,
          incHp: 0,
          isAlive: true,
        },
        {
          name: 'Mity',
          hp: 300,
          maxHp: 1200,
          incHp: 0,
          isAlive: true,
        }
      ]
    }
  }
  componentDidMount() {
    this.dmgtick = setInterval(() => this.damage(0, 2), 100)
  }
  incrementCastBar(inc) {
    const progress = this.state.castBarProgress + inc
    if (progress > 100) {
      this.finishCast()
    }else{
      this.setState({castBarProgress: progress})
    }
  }
  startCast(spell, playerNo) {
    if (!this.state.isCasting & this.state.players[playerNo].isAlive) {
      this.setState({
        isCasting: true,
        castBarProgress: 0,
        currentSpell: spell,
        spellTarget: playerNo,
      });
      this.incHeal(playerNo, spell.value)
      const inc = 2/spell.castTime // = 100/(castTime*50) at 50hz
      this.timer = setInterval(() => this.incrementCastBar(inc), 20)
    }
  }
  stopCast() {
    if (this.state.isCasting) {
      clearInterval(this.timer)
      this.incHeal(this.state.spellTarget, -this.state.currentSpell.value)
      this.setState({
        isCasting: false,
        castBarProgress: 0,
        currentSpell: null,
      });
    }
  }
  finishCast() {
    if (this.state.players[this.state.spellTarget].isAlive) {
      this.heal(this.state.spellTarget, this.state.currentSpell.value)
    }
    this.stopCast();
  }

  damage(playerNo, value) {
    let players = this.state.players
    let newHp = players[playerNo].hp - value

    if (newHp < 0){
      newHp = 0;
      players[playerNo].isAlive = false;
    }
    players[playerNo].hp = newHp
    this.setState(players: players)
  }

  heal(playerNo, value) {
    let players = this.state.players
    let newHp = players[playerNo].hp + value

    if (newHp > players[playerNo].maxHp){
      newHp = players[playerNo].maxHp
    }
    players[playerNo].hp = newHp
    this.setState(players: players)
  }

  incHeal(playerNo, value) {
    let players = this.state.players
    players[playerNo].incHp += value
    this.setState(players: players)
  }

  render() {
    const players = this.state.players.map((player, i) =>
      <PlayerFrame key={i} player={player}
        onClick={() => this.startCast(this.state.spells[0], i)}
      />
    );

    return (
      <div>
        <RaisedButton label="STOP" onClick={() => this.stopCast()} />
        <ManaBar
          mp={this.state.mp}
          maxMp={this.state.maxMp}
        />
        <CastBar
          spell={this.state.currentSpell}
          value={this.state.castBarProgress}
        />
        {players}
        <Hotbar spells={this.state.spells} />
      </div>
    )
  }
}


// <CastBar
//   spellName={'jilly'}
//   value={this.state.castBarProgress}
// />
export default App;
