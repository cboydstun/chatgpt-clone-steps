import React, { useState } from 'react'

import Home from './components/Home'
import ChatWindow from './components/ChatWindow'

import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
    const [inChat, setInChat] = useState(false)

    const startChat = () => {
        setInChat(true)
    };

    return (
        <ErrorBoundary>
            {inChat ? <ChatWindow /> : <Home startChat={startChat} />}
        </ErrorBoundary>
    )
}
