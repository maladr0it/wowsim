import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import CastBar from './Components/CastBar';
import PlayerFrame from './Components/PlayerFrame';
import ManaBar from './Components/ManaBar';
import Hotbar from './Components/Hotbar';

const KEY_BINDS = {
  cancelCast : 'Escape',
  hotbar1 : '1',
  hotbar2 : '2',
}
const SPELL_DATA = [
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
]
const PLAYER_DATA = [
  {
    name: 'Saulty',
    hp: 200,
    maxHp: 400,
    incHp: 0,
    isAlive: true,
  },
  {
    name: 'Oom',
    hp: 300,
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
];


class App extends React.Component {
  constructor() {
    super();
    // setting 'this' to App not #document
    document.addEventListener("keydown", this.handleKeyDown.bind(this))

    this.state = {
      isCasting: false,
      castBarProgress: 0,
      target: 0,
      spellTarget: 0,
      currentSpell: null,
      mp: 400,
      maxMp: 500,
      hotbarActions: [
        () => this.startCast(SPELL_DATA[0]),
        () => this.startCast(SPELL_DATA[1]),
      ],
      players: PLAYER_DATA
    }
  }

  componentDidMount() {
    this.castBarTimer = null;


    this.manaBarTimer = null;

    this.dmgtick = setInterval(() => {
      this.damage(0, 2)
      this.damage(1, 2)
      this.damage(2, 5)
    }, 500)
  }

  handleKeyDown(e) {
      // looks at key, step through KEY_BINDS to see if it has an action?
    switch(e.key) {
      case KEY_BINDS.hotbar1:
        this.state.hotbarActions[0]()
        break;
      case KEY_BINDS.hotbar2:
        this.state.hotbarActions[1]()
        break;
      case KEY_BINDS.cancelCast:
        this.stopCast()
        break;
    }
  }
  target(playerNo) {
    this.setState({
      target: playerNo
    });
  }

  adjustMp(value) {
    const mp = this.state.mp + value
    this.setState({
      mp: mp
    });
  }

  incrementCastBar(inc) {
    const progress = this.state.castBarProgress + inc
    if (progress > 100) {
      this.finishCast()
    }else{
      this.setState({castBarProgress: progress})
    }
  }
  startCast(spell) {
    const target = this.state.target
    if (!this.state.isCasting & this.state.players[target].isAlive) {
      this.adjustIncHeal(target, spell.value)
      const inc = 2/spell.castTime // = 100/(castTime*50) at 50hz
      this.castBarTimer = setInterval(() => this.incrementCastBar(inc), 20)
      this.setState({
        isCasting: true,
        castBarProgress: 0,
        currentSpell: spell,
        spellTarget: target,
      });
    }
  }
  stopCast() {
    if (this.state.isCasting) {
      clearInterval(this.castBarTimer)
      this.adjustIncHeal(this.state.spellTarget, -this.state.currentSpell.value)
      this.setState({
        isCasting: false,
        castBarProgress: 0,
        currentSpell: null,
      });
    }
  }
  finishCast() {
    if (this.state.players[this.state.spellTarget].isAlive) {
      this.adjustHp(this.state.spellTarget, this.state.currentSpell.value)
      this.adjustMp(-this.state.currentSpell.cost)
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
  adjustHp(playerNo, value) {
    let players = this.state.players
    let newHp = players[playerNo].hp + value

    if (newHp > players[playerNo].maxHp){
      newHp = players[playerNo].maxHp
    }
    players[playerNo].hp = newHp
    this.setState(players: players)
  }
  adjustIncHeal(playerNo, value) {
    let players = this.state.players
    players[playerNo].incHp += value
    this.setState(players: players)
  }

  render() {
    const players = this.state.players.map((player, i) =>
      <PlayerFrame
        key={i}
        player={player}
        onMouseEnter={() => this.target(i)}
      />
    );

    return (
      <div>
        <ManaBar
          mp={this.state.mp}
          maxMp={this.state.maxMp}
        />
        <CastBar
          spell={this.state.currentSpell}
          value={this.state.castBarProgress}
        />
        {players}
      </div>
    )
  }
}

// <Hotbar spells={this.state.hotbarActions} />

export default App;
