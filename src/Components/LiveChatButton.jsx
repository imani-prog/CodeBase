
import { useEffect, useRef, useState } from "react";

const LiveChatButton = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Thank you for your message! We'll get back to you soon." },
      ]);
    }, 800);
    setInput("");
  };

  return (
    <>
      {/* Chat Window - Full page on mobile, modal on desktop */}
      {open && (
        <>
          {/* Backdrop for desktop only */}
          <div 
            className="hidden md:block fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          
          {/* Chat Container */}
          <div className={`
            fixed z-50
            ${/* Mobile: Full screen */ ''}
            inset-0 md:inset-auto
            ${/* Desktop: Bottom right modal */ ''}
            md:bottom-24 md:right-8
            ${/* Mobile: Full width/height, Desktop: Fixed width */ ''}
            w-full h-full md:w-96 md:h-[600px] md:max-h-[calc(100vh-8rem)]
            ${/* Styling */ ''}
            bg-white rounded-none md:rounded-2xl shadow-none md:shadow-2xl 
            border-0 md:border md:border-blue-200
            flex flex-col overflow-hidden
            animate-fade-in
          `}>
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 sm:px-5 md:px-4 py-3 sm:py-4 md:py-3 font-bold flex justify-between items-center flex-shrink-0">
              <span className="text-base sm:text-lg md:text-base">Live Chat</span>
              <button
                className="text-white hover:text-blue-200 text-2xl sm:text-3xl md:text-xl font-bold w-8 h-8 flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 px-4 sm:px-5 md:px-4 py-3 sm:py-4 md:py-3 bg-blue-50 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 sm:mb-4 md:mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`
                    px-3 sm:px-4 md:px-3 
                    py-2 sm:py-3 md:py-2 
                    rounded-xl 
                    max-w-[75%] sm:max-w-[70%]
                    text-sm sm:text-base md:text-sm
                    ${msg.sender === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-blue-800 border border-blue-200"
                    }
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form 
              className="flex px-4 sm:px-5 md:px-4 py-3 sm:py-4 md:py-3 bg-blue-100 flex-shrink-0 gap-2" 
              onSubmit={handleSend}
            >
              <input
                type="text"
                className="flex-1 px-3 sm:px-4 md:px-3 py-2 sm:py-3 md:py-2 rounded-xl text-sm sm:text-base md:text-sm border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-4 py-2 sm:py-3 md:py-2 rounded-xl font-bold text-sm sm:text-base md:text-sm whitespace-nowrap"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}

      {/* Floating Button */}
      <button
        className={`
          fixed z-40
          ${/* Position */ ''}
          bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8
          ${/* Styling */ ''}
          bg-blue-600 hover:bg-blue-700 text-white font-bold 
          ${/* Size - responsive */ ''}
          py-2 px-4 sm:py-3 sm:px-5 md:py-3 md:px-6
          rounded-full shadow-lg 
          flex items-center gap-2 
          focus:outline-none focus:ring-2 focus:ring-blue-400
          ${/* Text size */ ''}
          text-sm sm:text-base
          ${/* Transition */ ''}
          transition-all duration-200
          ${open ? 'md:opacity-0 md:pointer-events-none' : 'opacity-100'}
        `}
        title="Need help? Chat with us now."
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.01L3 21l1.01-4.39A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="hidden sm:inline">Live Chat</span>
        <span className="sm:hidden">Chat</span>
      </button>
    </>
  );
};

export default LiveChatButton;
