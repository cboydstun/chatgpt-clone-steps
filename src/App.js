import React, { useState } from 'react'

import Home from './components/Home'
import ChatWindow from './components/ChatWindow'

import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

export default function App() {
    const [inChat, setInChat] = useState(false)

    const startChat = () => {
        setInChat(true)
    };

    return (
        <div className='App'>
            <ErrorBoundary>
                {inChat ? <ChatWindow /> : <Home startChat={startChat} />}
            </ErrorBoundary>
        </div>
    )
}
