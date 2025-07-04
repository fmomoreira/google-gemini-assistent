import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FaUser, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const chatBoxRef = useRef(null);
  const loadingMessages = [
    "Estou pensando...",
    "Procurando a melhor resposta...",
    "Vou te ajudar com isso...",
    "Mais alguns instantes...",
    "Elaborando uma resposta para você...",
    "Analisando sua pergunta..."
  ];
  
  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  // Função para alternar mensagens de carregamento
  useEffect(() => {
    let interval;
    if (isLoading) {
      let index = 0;
      setLoadingMessage(loadingMessages[0]);
      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message) return;

    const userMessage = { role: 'user', content: message };
    setChat(prevChat => [...prevChat, userMessage]);
    setIsLoading(true);
    setMessage(''); // Limpa o input imediatamente após enviar

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
      const errorMessage = { 
        role: 'bot', 
        content: 'Desculpe, não consegui me conectar ao servidor.',
        isError: true
      };
      setChat(prevChat => [...prevChat, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Gemini Chat</h1>
      </header>
      <div className="chat-container">
        <div className="chat-box" ref={chatBoxRef}>
          {chat.length === 0 && (
            <div className="welcome-message">
              <FaRobot className="bot-icon large" />
              <h2>Olá! Como posso ajudar você hoje?</h2>
              <p>Faça uma pergunta para começar a conversa.</p>
            </div>
          )}
          
          {chat.map((msg, index) => (
            <div 
              key={index} 
              className={`chat-message ${msg.role} ${msg.isError ? 'error' : ''}`}
            >
              <div className="message-header">
                {msg.role === 'user' ? (
                  <FaUser className="user-icon" />
                ) : (
                  <FaRobot className="bot-icon" />
                )}
                <span className="message-role">
                  {msg.role === 'user' ? 'Você' : 'Gemini AI'}
                </span>
              </div>
              <div className="message-content">
                {msg.role === 'bot' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-message bot loading">
              <div className="message-header">
                <FaRobot className="bot-icon" />
                <span className="message-role">Gemini AI</span>
              </div>
              <div className="message-content">
                <p className="loading-text">{loadingMessage}</p>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form className="chat-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua pergunta..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !message}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;