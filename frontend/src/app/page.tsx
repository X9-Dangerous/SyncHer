import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Header/Nav */}
          <nav className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
                <svg className="w-6 h-6 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-red-100">SyncHer</span>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/login"
                className="px-5 py-2 text-red-200 hover:text-red-100 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="px-5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-100 rounded-lg border border-red-500/30 transition-all duration-200 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-200 text-sm font-medium backdrop-blur-sm">
                🌸 Menstrual Health Companion
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-red-100 to-amber-100 mb-6 leading-tight">
              Welcome to SyncHer
            </h1>
            <p className="text-xl text-red-200/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered companion for menstrual health support, education, and empowerment. Get personalized guidance and answers to all your questions.
            </p>
            
            {/* CTA Button */}
            <Link 
              href="/guest-chat"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-red-500/50 hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 border border-red-500/30"
            >
              <span>Start Chatting</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="bg-gradient-to-br from-red-950/50 to-black/50 backdrop-blur-sm p-6 rounded-2xl border border-red-800/30 hover:border-red-700/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-100 mb-2">24/7 Support</h3>
              <p className="text-red-200/60">Get instant answers to your menstrual health questions anytime, anywhere.</p>
            </div>

            <div className="bg-gradient-to-br from-red-950/50 to-black/50 backdrop-blur-sm p-6 rounded-2xl border border-red-800/30 hover:border-red-700/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-100 mb-2">Private & Safe</h3>
              <p className="text-red-200/60">Your conversations are confidential and secure. Your privacy is our priority.</p>
            </div>

            <div className="bg-gradient-to-br from-red-950/50 to-black/50 backdrop-blur-sm p-6 rounded-2xl border border-red-800/30 hover:border-red-700/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-100 mb-2">Evidence-Based</h3>
              <p className="text-red-200/60">Reliable information backed by medical research and health expertise.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
