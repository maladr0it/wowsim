import React from 'react'

class PlayerComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      elapsed: 0,
      request: undefined,
    }
  }
  componentDidMount() {
    this.setState({
      request: requestAnimationFrame(() => this.tick())
      // request: requestAnimationFrame(this.tick)
    })
  }
      // this.interval = setInterval(this.forceUpdate.bind(this), 1)

  tick() {
    const elapsed = new Date().getTime() - this.props.startedCastAt
    this.setState({
      elapsed: elapsed,
      request: requestAnimationFrame(() => this.tick())
    })
  }

  componentWillUnmount() {
    // clearInterval(this.interval)
    cancelAnimationFrame(this.state.request)
  }

  render() {
    const {onCastClick, onStopClick, targetId, mp, targetHp} = this.props
    const castProgress = this.state.elapsed/1000/3 * 100

    const containerStyle = {
      width: '100px',
      height: '50px',
      background: '#EEEEEE',
    }
    const barStyle = {
      width: castProgress+'%',
      height: '100%',
      background: '#B3E5FC',
    }

    return (
      <div>
        {targetHp}
        <button onClick={onCastClick}>CAST</button>
        <button onClick={onStopClick}>STOP</button>
        target: {targetId} elapsed: {this.state.elapsed}
        <br />
        MP: {mp}
        <div style={containerStyle}>
          <div style={barStyle} />
        </div>
      </div>
    )
  }

}

// const PlayerComponent = ({ targetId, castProgress, onCastClick, onStopClick }) => {
//   const containerStyle = {
//     width: '100px',
//     height: '50px',
//     background: '#EEEEEE',
//   }
//   const barStyle = {
//     width: castProgress+'%',
//     height: '100%',
//     background: '#B3E5FC',
//   }
//
//   return (
//     <div>
//       <button onClick={onCastClick}>CAST</button>
//       <button onClick={onStopClick}>STOP</button>
//       target: {targetId}
//       <div style={containerStyle}>
//         <div style={barStyle} />
//       </div>
//     </div>
//   )
// }

export default PlayerComponent
