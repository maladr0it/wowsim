import { connect } from 'react-redux'

import { startGame, stopGame } from '../actions'
import GameComponent from '../components/GameComponent'

const mapStateToProps = (state) => ({
  isRunning: state.game.isRunning
})

export default connect(
  mapStateToProps,
  { startGame, stopGame }
  )(GameComponent)
