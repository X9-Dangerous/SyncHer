"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";



type Message = {
  sender: "user" | "bot";
  text : string;
}

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7));



  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      sender : "user", 
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    


    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/chatbot/ask", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          question: userMessage.text,
          session_id: sessionId
         }),
      });
      
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }

      const data = await res.json();

      const botMessage: Message = { 
        sender : "bot",
        text: data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Failed to get response from backend" }]);
    }finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  
    router.push("/");              
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-black text-white shadow-2xl border-b border-red-900/30">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-red-500/10 rounded-full transition-colors group"
                title="Back to Dashboard"
              >
                <svg className="w-6 h-6 text-red-300 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-12 h-12 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
                <svg className="w-7 h-7 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-100">SyncHer</h1>
                <p className="text-red-200/70 text-sm">Your private companion</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 rounded-lg text-red-200 text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-red-900/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6 px-2">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-red-900/40 backdrop-blur-sm rounded-full shadow-lg border border-red-500/30 mb-4">
                <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-100 mb-2">Welcome to SyncHer!</h2>
              <p className="text-red-200/60">Ask me anything about menstrual health, wellness, or periods.</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-amber-100 to-orange-100 text-gray-900 rounded-br-sm border border-amber-200"
                    : "bg-gradient-to-br from-red-900 to-red-950 text-red-50 rounded-bl-sm border border-red-700/50"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gradient-to-br from-red-900 to-red-950 text-red-50 rounded-2xl rounded-bl-sm px-5 py-3 shadow-lg border border-red-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-br from-red-950/80 to-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-800/50 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask SyncHer anything about menstrual health..."
              className="flex-1 px-4 py-3 bg-black/30 border border-red-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-red-50 placeholder-red-300/40"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 border border-red-500/30"
            >
              <span>Send</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
