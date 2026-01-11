"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-red-500/20 shadow-2xl relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mx-auto mb-8">
            <svg className="w-10 h-10 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-red-100 mb-4 tracking-tight">Access Restricted</h1>
          <p className="text-red-200/60 leading-relaxed mb-10">
            It seems you&apos;re trying to reach a private area of SyncHer. May we ask if you have an account or if you&apos;d like to join our community?
          </p>

          <div className="space-y-4">
            <Link 
              href="/login"
              className="block w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold shadow-lg transition-all duration-200"
            >
              Sign In to Your Account
            </Link>
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-red-500/10"></div>
              <span className="text-xs uppercase tracking-widest text-red-200/20 font-bold">or</span>
              <div className="flex-1 h-px bg-red-500/10"></div>
            </div>
            <Link 
              href="/register"
              className="block w-full py-3.5 bg-red-950/40 hover:bg-red-900/40 text-red-100 rounded-xl font-bold border border-red-500/20 transition-all duration-200"
            >
              Join SyncHer Today
            </Link>
          </div>

          <p className="mt-8 text-xs text-red-200/30">
            Questions? Contact our support or check our <Link href="/" className="underline hover:text-red-200/50">Landing Page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
