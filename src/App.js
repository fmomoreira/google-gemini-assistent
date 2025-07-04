import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message) return;

    const userMessage = { role: 'user', content: message };
    setChat(prevChat => [...prevChat, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.reply };
      setChat(prevChat => [...prevChat, botMessage]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = { role: 'bot', content: 'Desculpe, não consegui me conectar ao servidor.' };
      setChat(prevChat => [...prevChat, errorMessage]);
    }

    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Gemini</h1>
      </header>
      <div className="chat-container">
        <div className="chat-box">
          {chat.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua pergunta..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;