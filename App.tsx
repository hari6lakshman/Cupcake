import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import ChatMessage from './components/ChatMessage.tsx';
import ChatInput from './components/ChatInput.tsx';
import { Role, Message, ChatState } from './types.ts';
import { generateCupcakeResponse } from './services/geminiService.ts';
import { Sparkles, Loader2, CandyOff } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: 'initial',
        role: Role.AI,
        content: "Hi there! I'm Cupcake, your delightful AI companion. How can I brighten your day today? 🧁✨",
        timestamp: new Date()
      }
    ],
    isLoading: false,
    error: null,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [state.messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const history = [...state.messages, userMessage].map(msg => ({
        role: msg.role === Role.USER ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }]
      }));

      const aiResponseContent = await generateCupcakeResponse(history);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.AI,
        content: aiResponseContent,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "Something went a bit crumbly! Please try again."
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#FFD1DC] text-[#5D3A42]">
      {/* Trio of Soft Pastel Background Glows */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-white/40 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFB6C1]/40 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-[#BFEFFF]/40 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '15s' }}></div>
      
      <Header />

      <main className="flex-1 overflow-hidden flex flex-col relative z-0">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full relative z-10"
        >
          {state.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {state.isLoading && (
            <div className="flex items-center gap-3 text-[#FFF5F7] mb-6 animate-pulse">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center border border-white shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-[#FFB6C1]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest drop-shadow-sm">Cupcake is whisking up a response...</span>
            </div>
          )}

          {state.error && (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-red-200 p-4 rounded-2xl mb-6 text-red-600 text-sm shadow-md">
              <CandyOff size={20} className="flex-shrink-0 text-red-400" />
              <p>{state.error}</p>
            </div>
          )}
        </div>

        {state.messages.length === 1 && !state.isLoading && (
          <div className="flex flex-wrap justify-center gap-3 px-4 py-4 mb-4 relative z-10">
            {[
              "Tell me a sweet joke! 🍬",
              "Cupcake recipes? 🧁",
              "I need a pep talk ✨",
              "Favorite frosting flavor? 🍦"
            ].map((text) => (
              <button
                key={text}
                onClick={() => handleSendMessage(text)}
                className="px-5 py-2.5 bg-white border border-[#FFB6C1] rounded-full text-xs font-semibold text-[#8E4D5B] hover:bg-[#FFF5F7] hover:border-[#FFD1DC] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </main>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={state.isLoading} 
      />

      {/* Floating Status Card */}
      <div className="absolute top-24 right-6 hidden lg:block z-20">
        <div className="p-5 bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-xl max-w-[220px]">
          <h3 className="text-[#8E4D5B] font-bold text-sm mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-[#FFB6C1]" /> Sweet Tip
          </h3>
          <p className="text-[11px] text-[#A67B84] leading-relaxed italic">
            "Life is short, eat the cupcake first!"
          </p>
          <div className="mt-4 pt-3 border-t border-[#FFD1DC] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#FFB6C1] font-black uppercase tracking-widest leading-none">Cupcake AI</span>
              <span className="text-[8px] text-[#A67B84] font-bold">Pro Edition</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#BFEFFF] rounded-full animate-ping shadow-[0_0_8px_#BFEFFF]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}