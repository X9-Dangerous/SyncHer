"use client";

import { useEffect, useState } from "react";
import Unauthorized from "./unauthorized";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Defer state update to avoid cascading render lint error
    setTimeout(() => {
      setIsAuthenticated(!!token);
    }, 0);
  }, []);

  // Loading state while checking token
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
