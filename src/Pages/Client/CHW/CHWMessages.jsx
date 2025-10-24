import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  User,
  CheckCheck,
  Check
} from 'lucide-react';

const CHWMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      patientName: 'Sarah Wanjiru',
      patientId: 'PT-2023-001',
      avatar: 'SW',
      lastMessage: 'Thank you for the advice. I will follow the medication schedule.',
      timestamp: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      patientName: 'John Kamau',
      patientId: 'PT-2023-045',
      avatar: 'JK',
      lastMessage: 'When is my next appointment?',
      timestamp: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 3,
      patientName: 'Mary Njoki',
      patientId: 'PT-2023-089',
      avatar: 'MN',
      lastMessage: 'I have been feeling much better. Thank you!',
      timestamp: '2 days ago',
      unread: 0,
      online: true
    },
    {
      id: 4,
      patientName: 'Grace Akinyi',
      patientId: 'PT-2023-156',
      avatar: 'GA',
      lastMessage: 'Can we schedule a home visit this week?',
      timestamp: '3 days ago',
      unread: 1,
      online: false
    },
    {
      id: 5,
      patientName: 'Peter Ochieng',
      patientId: 'PT-2023-112',
      avatar: 'PO',
      lastMessage: 'The medication is working well.',
      timestamp: '4 days ago',
      unread: 0,
      online: false
    }
  ];

  // Sample messages for selected conversation
  const messages = {
    1: [
      {
        id: 1,
        sender: 'patient',
        text: 'Hello, I have a question about my medication.',
        timestamp: '9:45 AM',
        status: 'read'
      },
      {
        id: 2,
        sender: 'chw',
        text: 'Hello Sarah! Of course, I\'m here to help. What would you like to know?',
        timestamp: '9:47 AM',
        status: 'read'
      },
      {
        id: 3,
        sender: 'patient',
        text: 'Should I take the blood pressure medication with food or on an empty stomach?',
        timestamp: '9:50 AM',
        status: 'read'
      },
      {
        id: 4,
        sender: 'chw',
        text: 'Good question! For the medication you\'re taking, it\'s best to take it with food to avoid any stomach upset. Try to take it at the same time each day with your breakfast.',
        timestamp: '9:52 AM',
        status: 'read'
      },
      {
        id: 5,
        sender: 'patient',
        text: 'Thank you for the advice. I will follow the medication schedule.',
        timestamp: '10:30 AM',
        status: 'delivered'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'patient',
        text: 'Hi, I need to check my appointment schedule.',
        timestamp: 'Yesterday, 3:20 PM',
        status: 'read'
      },
      {
        id: 2,
        sender: 'chw',
        text: 'Hello John! Let me check that for you.',
        timestamp: 'Yesterday, 3:22 PM',
        status: 'read'
      },
      {
        id: 3,
        sender: 'patient',
        text: 'When is my next appointment?',
        timestamp: 'Yesterday, 3:25 PM',
        status: 'read'
      }
    ]
  };

  const selectedPatient = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Communicate with your patients
        </p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-[calc(100%-5rem)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.patientName}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.patientId}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedPatient ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedPatient.avatar}
                    </div>
                    {selectedPatient.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPatient.patientName}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedPatient.online ? 'Online' : 'Offline'} • {selectedPatient.patientId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'chw' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender === 'chw'
                          ? 'bg-blue-600 text-white rounded-l-xl rounded-tr-xl'
                          : 'bg-white text-gray-900 rounded-r-xl rounded-tl-xl shadow-sm'
                      } p-4`}
                    >
                      <p className="text-sm mb-1">{message.text}</p>
                      <div className={`flex items-center justify-end space-x-1 ${
                        message.sender === 'chw' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.sender === 'chw' && (
                          message.status === 'read' ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      rows="1"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    <button className="absolute right-3 bottom-3 hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-md"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CHWMessages;
