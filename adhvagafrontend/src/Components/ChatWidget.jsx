import { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";

const LYZR_API_KEY = "sk-default-CTqgKmdyXOTl4tmXoEldb0jDu2Q5qWEH";
const LYZR_AGENT_ID = "69c2645fa89e324bcd4faf7c";
const LYZR_USER_ID = "adhvagtravels@gmail.com";
const LYZR_SESSION_ID = "69c2645fa89e324bcd4faf7c-pqtk2nqfp7";
const LYZR_API_URL = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! 👋 How can we assist you today? Ask about our services, packages, or custom itineraries.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(LYZR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": LYZR_API_KEY,
        },
        body: JSON.stringify({
          user_id: LYZR_USER_ID,
          agent_id: LYZR_AGENT_ID,
          session_id: LYZR_SESSION_ID,
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract bot response from API
      const botResponseText = data?.data?.response || data?.response || "I couldn't process that. Please try again.";

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponseText,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again or visit our support page.",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-widget-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with us"
        title="Chat with Adhvaga"
      >
        <span className="chat-icon-bubble">💬</span>
      </button>

      {/* Chat Dialog */}
      {isOpen && (
        <div className="chat-widget-container">
          <div className="chat-widget-header">
            <div className="chat-widget-title">
              <span className="chat-title-text">Chat with Adhvaga</span>
              <span className="chat-status">Online</span>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message chat-message-${msg.type}`}>
                <div className="chat-message-bubble">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-bot">
                <div className="chat-message-bubble chat-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-widget-input-area">
            <textarea
              className="chat-input-field"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="2"
              disabled={isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? "..." : "↑"}
            </button>
          </div>

          <div className="chat-widget-footer">
            <p>💡 Ask about services, packages, or book a call</p>
          </div>
        </div>
      )}
    </>
  );
}
