import { connect } from 'react-redux'

import AlertsComponent from '../components/AlertsComponent'

const mapStateToProps = (state) => ({
  messages: state.alerts.messages
})
export default connect(
  mapStateToProps
  )(AlertsComponent)
