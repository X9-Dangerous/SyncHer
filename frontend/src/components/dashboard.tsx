"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
              <svg className="w-6 h-6 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-100">SyncHer Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 rounded-lg text-red-200 text-sm font-medium transition-all"
          >
            Logout
          </button>
        </header>

        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-red-300 mb-2">
            Welcome back!
          </h2>
          <p className="text-red-200/60">Manage your menstrual wellness journeys and history.</p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* New Chat Card */}
          <Link href="/chat" className="group">
            <div className="h-64 bg-gradient-to-br from-red-900/40 to-black/60 backdrop-blur-xl p-8 rounded-3xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group-hover:shadow-[0_0_40px_-5px_rgba(239,68,68,0.2)]">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
              <div>
                <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-100 mb-2">AI Companion</h3>
                <p className="text-red-200/50">Start a new conversation for support and guidance.</p>
              </div>
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <span>Go to chat</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* History Card */}
          <Link href="/history" className="group">
            <div className="h-64 bg-gradient-to-br from-amber-900/20 to-black/60 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group-hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.1)]">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
              <div>
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-amber-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-amber-100/90 mb-2">View History</h3>
                <p className="text-amber-200/40">Review your past conversations and health insights.</p>
              </div>
              <div className="flex items-center gap-2 text-amber-400/80 font-semibold text-sm">
                <span>View logs</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
