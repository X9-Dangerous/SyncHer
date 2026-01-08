"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        }; 

        if (!payload.name || !payload.email || !payload.password) {
            setMessage("All fields are required");
            return; 
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok){
                setMessage(data.detail || "Registration failed.");
            } else{
                setMessage("Account created successfully!");
                router.push("/login")
            }

        } catch {
            setMessage("Something went wrong, try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/20 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-900/50 via-red-900/30 to-transparent p-8 text-center border-b border-red-500/20">
            <div className="w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-red-500/30 mx-auto mb-4 shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)]">
              <svg className="w-9 h-9 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-red-300 tracking-tight">SyncHer</h1>
            <p className="text-red-200/60 text-sm mt-2">Join your menstrual wellness community</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-red-200/50 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-300/40 group-focus-within:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    name="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-red-100 placeholder-red-900/50 transition-all duration-200 hover:border-red-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-red-200/50 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-300/40 group-focus-within:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-red-100 placeholder-red-900/50 transition-all duration-200 hover:border-red-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-red-200/50 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-300/40 group-focus-within:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-900/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-red-100 placeholder-red-900/50 transition-all duration-200 hover:border-red-500/30"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-xl font-bold shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                    <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    <span className="opacity-90">Creating Account...</span>
                    </>
                ) : (
                    <>
                    <span>Create Account</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </>
                )}
              </button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-fade-in ${
                message.includes("success") 
                  ? "bg-green-500/10 text-green-200 border border-green-500/20" 
                  : "bg-red-500/10 text-red-200 border border-red-500/20"
              }`}>
                {message.includes("success") ? (
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                {message}
              </div>
            )}

            <div className="mt-8 text-center">
                <p className="text-red-200/40 text-xs">
                    Already have an account? <Link href="/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">Sign In</Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

