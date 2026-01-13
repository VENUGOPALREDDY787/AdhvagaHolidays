import React, { useState, useRef, useEffect } from 'react';
import './ChatSupport.css';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am your Adhvaga Travel Assistant. ✈️ Where are you dreaming of going next?' }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add User Message
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate a UI response delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "That sounds like a wonderful trip! How can I help you plan that further?" 
      }]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      {isOpen ? (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="ai-avatar">
                <span>AI</span>
              </div>
              <div className="header-text">
                <h3>Adhvaga Concierge</h3>
                <span className="status-text">Always Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{background:'none', border:'none', cursor:'pointer'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} className="messages-container">
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.role === 'user' ? 'user-row' : 'model-row'}`}>
                <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'model-bubble'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper model-row">
                <div className="message-bubble model-bubble typing-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="chat-footer">
            <div className="input-wrapper">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about destinations..."
                className="chat-input"
              />
              <button onClick={handleSend} className="send-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p style={{fontSize: '10px', color: '#9ca3af', textAlign: 'center', marginTop: '8px'}}>
              Powered by Adhvaga UI
            </p>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="fab-button">
          <div className="tooltip">Need travel help? ✈️</div>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatSupport;