import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Coffee, Loader2 } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToBarista } from '../services/geminiService';

const AiBarista: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Parallax Brew! I'm your virtual barista. Need a recommendation or have questions about our beans?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    try {
      const responseText = await sendMessageToBarista(userMsg.text);
      const botMsg: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the coffee mind.", isError: true }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="bg-amber-600 text-white p-4 rounded-full shadow-2xl shadow-amber-900/50 flex items-center justify-center group"
            >
              <MessageSquare className="w-8 h-8 group-hover:hidden" />
              <Coffee className="w-8 h-8 hidden group-hover:block" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[600px] max-h-[80vh] bg-coffee-950 border border-coffee-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-coffee-900 p-4 border-b border-coffee-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600/20 rounded-full flex items-center justify-center border border-amber-600/50">
                    <Coffee className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-coffee-50 font-bold">AI Barista</h3>
                  <p className="text-xs text-coffee-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-coffee-400 hover:text-coffee-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-coffee-950/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-700 text-white rounded-tr-none'
                        : 'bg-coffee-800 text-coffee-100 rounded-tl-none border border-coffee-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loadingState === LoadingState.LOADING && (
                <div className="flex justify-start">
                   <div className="bg-coffee-800 p-3 rounded-2xl rounded-tl-none border border-coffee-700 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                      <span className="text-xs text-coffee-400">Brewing answer...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-coffee-900 border-t border-coffee-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about our roasts..."
                  className="flex-1 bg-coffee-950 border border-coffee-700 rounded-xl px-4 py-2 text-coffee-100 placeholder-coffee-600 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={loadingState === LoadingState.LOADING || !inputValue.trim()}
                  className="bg-amber-600 hover:bg-amber-500 disabled:bg-coffee-800 disabled:text-coffee-600 text-white p-2 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-[10px] text-coffee-600 text-center mt-2">
                Powered by Gemini. AI may hallucinate caffeine levels.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiBarista;