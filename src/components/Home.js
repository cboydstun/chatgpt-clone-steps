import React from 'react'

export default function Home({ startChat }) { // startChat is a prop passed from App.js
  return (
    <div className='home-page'>
      <h1>ChatGPT Clone with React.js</h1>
      <p>Click the button to get started!</p>
      <button onClick={startChat}>Start Chatting</button>
    </div>
  )
}
