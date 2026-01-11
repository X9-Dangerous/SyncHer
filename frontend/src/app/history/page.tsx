import ChatHistory from "@/components/chatHistory";
import AuthGuard from "@/components/authGuard";

export default function HistoryPage() {
  return (
    <AuthGuard>
      <ChatHistory />
    </AuthGuard>
  );
}
