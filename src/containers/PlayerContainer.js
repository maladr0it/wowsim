import { connect } from 'react-redux'
import PlayerComponent from '../components/PlayerComponent'
import { getTarget } from '../reducers'

import { startCast, cancelCast } from '../actions'


const mapStateToProps = (state) => ({
  player: state.player,
  target: getTarget(state),
})
export default connect(
  mapStateToProps,
  { startCast, cancelCast }
)(PlayerComponent)
