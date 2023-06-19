import React, { useState, useEffect } from 'react'

import Message from './Message'
import LoadingIndicator from './LoadingIndicator'

import axios from 'axios'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

  // load messages from local storage
  const loadFromLocalStorage = () => {
    const chatHistory = localStorage.getItem('chatHistory')
    if (chatHistory) {
      return JSON.parse(chatHistory)
    } else {
      return []
    }
  }


  // save messages to local storage
  const saveToLocalStorage = (chatHistory) => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }

  // load chat history when the component mounts
  useEffect(() => {
    const chatHistory = loadFromLocalStorage()
    setMessages(chatHistory)
  }, [])

  // load any saved messages from local storage
  useEffect(() => {
    const savedMessages = loadFromLocalStorage()
    if (savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [])

  const sendMessage = async (input) => {
    // add user message to state
    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])
    saveToLocalStorage([...messages, userMessage])

    console.log("USER MESSAGE: ", userMessage)

    // set loading to true
    setLoading(true)

    // headers for API call
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY
    }

    // data for API call
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }]
    }

    try {
      // send the user message to the API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        data,
        { headers }
      )

      console.log("RESPONSE: ", response)

      // add the API response to state
      const aiMessage = {
        sender: 'ai',
        text: response.data.choices[0].message.content.trim()
      }

      setMessages([...messages, userMessage, aiMessage])
      saveToLocalStorage([...messages, userMessage, aiMessage])
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
    <div className='chat-window'>
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
      <form onSubmit={handleSubmit} className='chat-form'>
        <input
          type="text"
          value={input}
          onChange={handleInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
