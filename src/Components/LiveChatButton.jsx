
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
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Popup */}
      {open && (
        <div className="mb-4 w-80 max-w-full bg-white rounded-2xl shadow-2xl border border-blue-200 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-blue-600 text-white px-3 py-2 font-bold flex justify-between items-center">
            <span>Live Chat</span>
            <button
              className="text-white hover:text-blue-200 text-xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-4 py-2 bg-blue-50" style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl max-w-[70%] ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-blue-800 border border-blue-200"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="flex px-4 py-3 bg-blue-100" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-l-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl font-bold"
            >
              Send
            </button>
          </form>
        </div>
      )}
      {/* Floating Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        title="Need help? Chat with us now."
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.01L3 21l1.01-4.39A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Live Chat
      </button>
    </div>
  );
};

export default LiveChatButton;
