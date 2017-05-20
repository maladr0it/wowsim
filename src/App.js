import React from 'react';

import CastBar from './Components/CastBar';
import ManaBar from './Components/ManaBar';
import Hotbar from './Components/Hotbar';

import Player from './Containers/Player';

import ht_logo from './img/spell_nature_healingtouch.jpg';
import rg_logo from './img/spell_nature_resistnature.jpg';

const KEY_BINDS = {
  cancelCast : 'Escape',
  hotbar1 : '1',
  hotbar2 : '2',
}
const SPELL_DATA = [
  {
    name: 'Healing Touch',
    icon: ht_logo,
    value: 150,
    cost: 42,
    castTime: 1.5,
  },
  {
    name: 'Regrowth',
    icon: rg_logo,
    value: 200,
    cost: 121,
    castTime: 1,
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
      mp: 1800,
      maxMp: 2000,
      hotbarItems: [
        {
          spell: SPELL_DATA[0],
          keyBind: KEY_BINDS.hotbar1
        },
        {
          spell: SPELL_DATA[1],
          keyBind: KEY_BINDS.hotbar2
        }
      ],
      players: PLAYER_DATA
    }
  }

  componentDidMount() {
    this.castBarTimer = null;

    this.manaBarTimer = setInterval(() => {
      this.adjustMp(21)
    }, 2000);

    this.dmgtick = setInterval(() => {
      this.damage(0, 2)
      this.damage(1, 2)
      this.damage(2, 20)
    }, 500);
  }

  handleKeyDown(e) {
    const hotbarItems = this.state.hotbarItems
    switch(e.key) {
      case hotbarItems[0].keyBind:
        this.startCast(hotbarItems[0].spell);
        break;
      case hotbarItems[1].keyBind:
        this.startCast(hotbarItems[1].spell);
        break;
      case KEY_BINDS.cancelCast:
        this.stopCast()
        break;
      default:
        break;
    }
  }
  target(playerNo) {
    this.setState({
      target: playerNo
    });
  }

  adjustMp(value) {
    let newMp = this.state.mp + value;

    if (newMp > this.state.maxMp) {
      newMp = this.state.maxMp;
    }
    if (newMp < 0) {
      newMp = 0;
    }
    this.setState({
      mp: newMp
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
    const spellTarget = this.state.target
    if ( !this.state.isCasting &
    this.state.players[spellTarget].isAlive &
    !(spell.cost > this.state.mp)) {
      this.adjustIncHeal(spellTarget, spell.value)
      const inc = 2/spell.castTime // = 100/(castTime*50) at 50hz
      this.castBarTimer = setInterval(() => this.incrementCastBar(inc), 20)
      this.setState({
        isCasting: true,
        castBarProgress: 0,
        currentSpell: spell,
        spellTarget: spellTarget,
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
    const target = this.state.players[this.state.spellTarget]
    const currentSpell = this.state.currentSpell

    if (target.isAlive & !(currentSpell.cost > this.state.mp)) {
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
      <Player
        key={i}
        {...player}
        handleMouseEnter={() => this.target(i)}
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
        <Hotbar
          items={this.state.hotbarItems}
          actionHandler={(spell)=>this.startCast(spell)}
        />
      </div>
    )
  }
}



export default App;
