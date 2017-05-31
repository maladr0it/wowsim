import React from 'react'

const Alerts = ({ messages }) => {
  return (
    <div>
      {messages.map((message, i) => <div key={i}>{message}</div>)}
    </div>
  )
}
export default Alerts
