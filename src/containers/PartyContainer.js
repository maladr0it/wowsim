import { connect } from 'react-redux'

import { setTarget } from '../actions'
import PartyComponent from '../components/PartyComponent'

const mapStateToProps = (state) => ({
  members: state.party.members
})

export default connect(
  mapStateToProps,
  { setTarget }
  )(PartyComponent)
