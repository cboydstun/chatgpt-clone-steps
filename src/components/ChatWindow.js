import React, { useState } from 'react'

import Message from './Message'
import LoadingIndicator from './LoadingIndicator'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const handleSubmit = async (e) => { }

  return (
    <div>
      {/* DISPLAY ALL MESSAGES */}
      {messages.map((message, index) => (
        <Message
          key={index}
          sender={message.sender}
          text={message.text} />
      ))}


      {/* DISPLAY LOADING INDICATOR */}
      {loading && <LoadingIndicator />}

      {/* DISPLAY INPUT */}
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
