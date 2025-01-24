import { Message } from "@/types/message";

type UseChatReturnType = {
  messages: Message[];
  lastSystemMessageText: string;
  isStreaming: boolean;
  chat: (prompt: string) => void;
};

export default function useChat(): UseChatReturnType {
  const messages: Message[] = [
    {
      id: 1,
      role: "user",
      text: "How are you?",
    },
    {
      id: 2,
      role: "system",
      text: "Good! You?",
    },
  ];

  return {
    messages,
    chat: () => {},
    isStreaming: false,
    lastSystemMessageText: "",
  };
}
