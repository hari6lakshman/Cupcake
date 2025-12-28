import React from 'react';
import { Role, Message } from '../types';
import { User, Cake } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.role === Role.AI;

  return (
    <div className={`flex w-full mb-6 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[70%] ${isAi ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
          isAi ? 'bg-white text-pink-500' : 'bg-sky-200 text-sky-600'
        }`}>
          {isAi ? <Cake size={16} fill="currentColor" /> : <User size={16} />}
        </div>
        
        <div className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed transition-all ${
            isAi 
              ? 'message-pink rounded-tl-none border border-white' 
              : 'message-blue rounded-tr-none border border-sky-100 shadow-sky-100/50'
          }`}>
            {message.content}
          </div>
          <span className={`text-[10px] mt-1 px-1 font-semibold ${isAi ? 'text-[#8E4D5B]/60' : 'text-sky-600/70'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;