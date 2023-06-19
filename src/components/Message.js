import React from 'react'

export default function Message({ sender, text }) {

  const align = sender === 'user' ? 'right' : 'left'

  return (
    <div style={{ textAlign: align }} className='message'>
      <p>{text}</p>
    </div>
  )
}
