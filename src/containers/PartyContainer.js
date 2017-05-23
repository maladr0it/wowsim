import React from 'react'
import { connect } from 'react-redux'


import { setTarget } from '../actions'
import Party from '../components/Party'


const PartyContainer = ({ players, setTarget }) => (
  <Party players={players} handleClick={setTarget} />
)

const mapStateToProps = (state) => ({
  players: state.party
})

export default connect(
  mapStateToProps,
  { setTarget }
)(PartyContainer)
