import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-2xl border-t border-white shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-3">
        <div className="relative flex-1 group">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a sweet message..."
            disabled={disabled}
            className="w-full bg-white border border-[#FFB6C1]/50 rounded-2xl py-3.5 px-5 pr-12 text-sm focus:outline-none focus:ring-4 focus:ring-[#FFD1DC]/40 focus:border-[#FFB6C1] transition-all resize-none disabled:opacity-50 disabled:bg-gray-50 text-[#5D3A42] placeholder:text-[#A67B84]/40 font-medium shadow-sm"
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />
          <div className="absolute right-4 bottom-3.5 flex items-center gap-2">
             <button
              type="button"
              className="text-[#FFB6C1] hover:text-[#FF9AA2] transition-colors p-1"
              title="Add a sprinkle"
            >
              <ImageIcon size={18} />
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="bg-[#FFB6C1] hover:bg-[#FF9AA2] disabled:bg-gray-100 disabled:text-gray-300 text-white p-3.5 rounded-2xl shadow-lg hover:shadow-pink-200 transition-all transform active:scale-95 flex items-center justify-center border border-white"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;