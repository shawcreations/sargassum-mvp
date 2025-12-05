import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../lib/api';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Sargassum management assistant. I can help you with:\n\n• Planning cleanup operations\n• Analyzing beach conditions\n• Coordinating campaigns\n• Answering questions about sargassum management\n\nHow can I assist you today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response.assistant }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the backend API is running and try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    'What beaches need attention this week?',
    'How do I plan a cleanup campaign?',
    'What equipment is needed for sargassum removal?',
    'Best practices for sargassum disposal?',
  ];

  const handleSuggestion = (question) => {
    setInput(question);
    setShowSidebar(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-3 md:mb-4 flex items-center justify-between">
        <div>
          <h1 className="page-title">AI Assistant</h1>
          <p className="page-subtitle hidden sm:block">Get help with sargassum management</p>
        </div>
        {/* Mobile toggle for suggestions */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden btn-secondary text-xs"
        >
          {showSidebar ? 'Hide Tips' : 'Show Tips'}
        </button>
      </div>

      <div className="flex-1 flex gap-4 md:gap-6 min-h-0 relative">
        {/* Chat Area */}
        <div className="flex-1 card flex flex-col p-0 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[80%] p-3 md:p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 md:p-4 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-slate-700">
            <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="input-field flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="btn-primary px-4 md:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar - Desktop always visible, Mobile toggleable */}
        <div className={`
          ${showSidebar ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent' : 'hidden lg:block'}
        `} onClick={(e) => e.target === e.currentTarget && setShowSidebar(false)}>
          <div className={`
            ${showSidebar ? 'absolute right-0 top-0 h-full w-72 bg-slate-900 p-4 overflow-y-auto' : ''}
            lg:relative lg:w-72 xl:w-80 space-y-4 lg:space-y-4
          `}>
            {/* Mobile close button */}
            {showSidebar && (
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}

            {/* Suggested Questions */}
            <div className="card">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(question)}
                    className="w-full text-left text-xs md:text-sm text-slate-300 hover:text-white p-2 md:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="card">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                What I Can Help With
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Plan and optimize cleanup campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Analyze sargassum patterns and trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Coordinate team assignments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Provide best practices guidance</span>
                </li>
              </ul>
            </div>

            {/* Status */}
            <div className="card">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs md:text-sm text-slate-400">AI Assistant Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
