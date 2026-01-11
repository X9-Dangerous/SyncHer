import Dashboard from "@/components/dashboard";
import AuthGuard from "@/components/authGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
