import React from 'react'

const castBarStyle = {
  flex: 'none',
  height: '100%',
  background: '#FFF9C4',
}

class CastBar extends React.Component {
  constructor() {
    super()
    this.state = {
      elapsed: 0,
      request: undefined
    }
  }
  componentDidMount() {
    this.setState({
      request: requestAnimationFrame(() => this.tick())
    })
  }
  tick() {
    const elapsed = new Date().getTime() - this.props.startTime
    this.setState({
      elapsed: elapsed,
      request: requestAnimationFrame(() => this.tick())
    })
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.request)
  }
  render() {
    const castBarPerc = (this.state.elapsed / (this.props.duration*1000)) * 100
    return (
      <div style={{...castBarStyle, width: castBarPerc+'%'}} />
    )
  }
}
export default CastBar
