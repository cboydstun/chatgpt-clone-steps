import React, { useState } from 'react'

import Message from './Message'
import LoadingIndicator from './LoadingIndicator'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  return (
    <div>
      <Message />
      <LoadingIndicator />
    </div>
  )
}
