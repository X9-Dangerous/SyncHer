"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ChatLog = {
  question: string;
  response: string;
  intent: string;
  timestamp: string;
};

export default function ChatHistory() {
  const router = useRouter();
  const [history, setHistory] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chatbot/history", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        } else if (res.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);


  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black flex flex-col">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl text-white shadow-2xl border-b border-red-900/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-red-500/10 rounded-full transition-colors group">
                <svg className="w-6 h-6 text-red-300 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-red-100 italic tracking-tight">Chat History</h1>
                <p className="text-red-200/40 text-xs font-medium uppercase tracking-[0.2em]">SyncHer Journal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* History Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
             <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
             <p className="text-red-200/40 text-sm animate-pulse">Reading your history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-red-950/20 rounded-3xl border border-red-800/20">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-100/80 mb-2">No History Yet</h2>
            <p className="text-red-200/50 max-w-xs mx-auto">Start a conversation with SyncHer to see your logs here.</p>
            <Link href="/chat" className="mt-8 inline-block px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-100 rounded-lg border border-red-500/30 transition-all font-medium">
                Start Chatting
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {history.map((log, i) => (
              <div key={i} className="space-y-6">
                <div className="flex justify-center">
                    <span className="px-4 py-1 bg-red-950/40 border border-red-500/20 rounded-full text-[10px] text-red-300/60 font-mono tracking-widest uppercase">
                        {new Date(log.timestamp).toLocaleString()}
                    </span>
                </div>
                
                {/* Question (User Message style) */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-gradient-to-br from-amber-50 to-orange-100 text-gray-900 rounded-2xl rounded-br-sm px-5 py-4 shadow-lg border border-amber-200">
                    <p className="text-sm font-medium leading-relaxed">{log.question}</p>
                  </div>
                </div>

                {/* Response (Bot Message style) */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gradient-to-br from-red-900 to-red-950 text-red-50 rounded-2xl rounded-bl-sm px-6 py-4 shadow-xl border border-red-700/50">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{log.response}</p>
                    {log.intent && (
                        <div className="mt-4 pt-4 border-t border-red-100/10">
                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Intent: {log.intent}</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
