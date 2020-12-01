import React from 'react';
import './App.css';
import { messages } from "./data.json";
import MessageList from './components/chat/messages/messageList/messageList';

function App() {
  return (
    <div className="App">
      <MessageList messages={messages} />
    </div>
  );
}

export default App;
