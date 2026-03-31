import  { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    } else {
      setMessages([
        {
          text: "Hi! I'm GuideMaster. How can I assist you today?",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const fetchBookRecommendation = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: "recommend",
      });
      return response.data.reply; // Assuming the API returns { reply: "Book recommendation" }
    } catch (error) {
      console.error("Error fetching book recommendation:", error);
      return null;
    }
  };

  const fetchBestSellingBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/chatbot/bestsellers`);
      return response.data.books; // Assuming the API returns { books: ["Book 1", "Book 2", "Book 3"] }
    } catch (error) {
      console.error("Error fetching best-selling books:", error);
      return null;
    }
  };

  const handleNewUserMessage = async (newMessage) => {
    const userMessage = {
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    if (newMessage.toLowerCase().trim() === "recommend") {
      const recommendedBook = await fetchBookRecommendation();
      if (recommendedBook) {
        const botMessage = {
          text: recommendedBook,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          text: "Sorry, I couldn't fetch a recommendation. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } else if (
      newMessage.toLowerCase().trim() === "best selling" ||
      newMessage.toLowerCase().trim() === "best selling books"
    ) {
      const bestSellers = await fetchBestSellingBooks();
      if (bestSellers && bestSellers.length > 0) {
        const botMessage = {
          text: `Here are some best-selling books:\n${bestSellers
            .map((book, index) => `${index + 1}. ${book}`)
            .join("\n")}\n\nType "credit" to see the credits.`,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          text: "Sorry, I couldn't fetch the best-selling books. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } else if (newMessage.toLowerCase().trim() === "help") {
      const helpMessage = {
        text: "For assistance, please contact us at support@guidemaster.com. You can also sign up or log in at https://guidemaster.com.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, helpMessage]);
    } else if (newMessage.toLowerCase().trim() === "credit") {
      const creditMessage = {
        text: "Credits:  Deepti Manna, Rajdeep Biswas, Soumyajit Khan,Shubhankar Biswas, Akash Ghosh, Amit Paramanik",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, creditMessage]);
    } else {
      const defaultMessage = {
        text: "I'm here to help! You can ask for a book recommendation, best-selling books, type 'help' for contact details, or type 'credit' to see the credits.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, defaultMessage]);
    }

    setIsLoading(false);
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      handleNewUserMessage(inputValue);
      setInputValue("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>GuideMaster</h3>
            <button className="close-button" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
                <span className="chat-timestamp">{msg.timestamp}</span>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <p>Typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;