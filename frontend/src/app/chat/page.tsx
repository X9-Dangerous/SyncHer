import Chat from "@/components/chat";
import AuthGuard from "@/components/authGuard";

export default function ChatPage() {
  return (
    <AuthGuard>
      <h1 className="sr-only">Chat with SyncHer</h1>
      <Chat />
    </AuthGuard>
  );
}