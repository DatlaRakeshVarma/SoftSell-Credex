import React, { useState, useRef, useEffect } from 'react';
import { X, MessageSquare, Send, MinusCircle } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const faqResponses: Record<string, string> = {
  'how do i sell my license': 'To sell your license, simply fill out our contact form with details about your software licenses. Our team will evaluate them and provide a quote within 24 hours.',
  'what types of licenses do you buy': 'We purchase most major enterprise software licenses, including Microsoft, Adobe, Salesforce, Autodesk, Oracle, SAP, and many others. The licenses should have at least 3 months of validity remaining.',
  'how much can i get for my licenses': 'Values vary based on the software type, quantity, and remaining term. Generally, you can expect to receive 40-70% of the remaining value of your licenses.',
  'how long does the process take': 'The entire process typically takes 2-5 business days from submission to payment. Valuation is provided within 24 hours.',
  'is this legal': 'Yes, our process is completely legal and compliant. We handle all the paperwork to ensure proper license transfer according to each software vendor\'s terms.',
  'how do i get paid': 'We offer multiple payment options including wire transfer, ACH, or payment via major payment processors. You can choose your preferred method during the process.',
};

const suggestedQuestions = [
  'How do I sell my license?',
  'What types of licenses do you buy?',
  'How much can I get for my licenses?',
  'How long does the process take?',
  'Is this legal?',
  'How do I get paid?',
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm SoftSell's virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    
    // Find response in FAQ or use default
    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim();
      let responseText = 'I don\'t have information about that specific query. Could you try asking one of the suggested questions?';
      
      for (const [key, value] of Object.entries(faqResponses)) {
        if (normalizedInput.includes(key)) {
          responseText = value;
          break;
        }
      }
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setShowSuggestions(true);
    }, 800);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    handleSend();
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center animate-bounce"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
      
      {/* Chat widget */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[500px]'
          }`}
        >
          {/* Header */}
          <div 
            className="p-4 bg-primary-600 dark:bg-primary-700 text-white flex justify-between items-center cursor-pointer"
            onClick={() => isMinimized ? setIsMinimized(false) : null}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">SoftSell Assistant</span>
            </div>
            <div className="flex space-x-2">
              {!isMinimized && (
                <button
                  onClick={minimizeChat}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Minimize chat"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-120px)] p-4 overflow-y-auto">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`max-w-[85%] mb-4 ${
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}>
                    {message.text}
                  </div>
                  <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Suggested questions */}
              {showSuggestions && messages.length > 1 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Here are some questions you might have:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Input */}
          {!isMinimized && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message here..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-2 rounded-full ${
                    input.trim() 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;