import React, { useState } from 'react'

import Message from './Message'
import LoadingIndicator from './LoadingIndicator'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const sendMessage = async (input) => {
    // add user message to state
    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])

    console.log("USER MESSAGE: ", userMessage)

    // set loading to true
    setLoading(true)

    try {
      console.log("API CALL GOES HERE")
    } catch (error) {
      console.log(error)
    }

    // set loading to false
    setLoading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault() // prevents page refresh

    if (input.trim() !== '') {
      sendMessage(input)
      setInput('')
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value)
  };

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
          onChange={handleInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
