import ChatView from "@/components/chat/ChatView";
import Footer from "@/components/chat/Footer";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen py-4 gap-4">
      <ChatView />

      <Footer />
    </div>
  );
}
