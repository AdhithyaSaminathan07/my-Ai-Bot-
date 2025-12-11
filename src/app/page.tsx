// 'use client';

// import { useChat } from 'ai/react';

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   return (
//     <div className="flex flex-col w-full max-w-md mx-auto h-screen py-24 bg-white text-black">
//       <h1 className="text-2xl font-bold text-center mb-4">My AI Bot</h1>
      
//       <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-4">
//         {messages.map((m: any) => (
//           <div key={m.id} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
//             <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
//             {m.content}
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-4 bg-white border-t">
//         <input
//           className="w-full p-2 border border-gray-300 rounded shadow-xl text-black"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }


'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-gray-900">
      
      {/* 1. Glassmorphism Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
            AI
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800">Adhithya's Assistant</h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-green-400' : 'hidden'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLoading ? 'bg-green-500' : 'bg-slate-300'}`}></span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isLoading ? 'Thinking...' : 'Online'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Empty State (Welcome Message) */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4 animate-fade-in-up">
              <div className="p-6 bg-white rounded-3xl shadow-xl border border-slate-100 mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">How can I help you today?</h2>
              <p className="text-slate-500 max-w-md">
                I can help you build web apps, debug code, or answer questions about Adhithya's resume.
              </p>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((m: any) => (
            <div
              key={m.id}
              className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar (Only show on left) */}
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 border border-indigo-200">
                  <span className="text-xs font-bold text-indigo-600">AI</span>
                </div>
              )}

              {/* Bubble */}
              <div
                className={`relative px-6 py-4 rounded-2xl shadow-sm text-md leading-relaxed max-w-[80%] ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>

              {/* User Avatar (Only show on right) */}
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-600">ME</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Modern Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-slate-100 p-2 rounded-full border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all shadow-inner"
          >
            <input
              className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-slate-800 placeholder:text-slate-400"
              value={input}
              placeholder="Ask me anything..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-xs text-slate-400">Powered by Next.js & Llama 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}