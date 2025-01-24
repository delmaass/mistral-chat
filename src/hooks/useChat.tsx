import { Message } from "@/types/message";
import { useState } from "react";

type UseChatReturnType = {
  messages: Message[];
  lastSystemMessageText?: string;
  isStreaming: boolean;
  chatAsync: (prompt: string) => Promise<void>;
};

export default function useChat(): UseChatReturnType {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [lastSystemMessageText, setLastSystemMessageText] = useState<string>();

  const chatAsync = async (prompt: string): Promise<void> => {
    setMessages((prev) => {
      const lastMessageId = prev.length > 0 ? prev[prev.length - 1].id : 0;

      return [
        ...prev,
        ...(lastSystemMessageText !== undefined
          ? [
              {
                id: lastMessageId + 1,
                role: "system" as const,
                text: lastSystemMessageText,
              },
            ]
          : []),
        {
          id: lastMessageId + (lastSystemMessageText !== undefined ? 2 : 1),
          role: "user",
          text: prompt,
        },
      ];
    });
    setLastSystemMessageText(undefined);
    setIsStreaming(true);

    try {
      const streamingResponse = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!streamingResponse.body) {
        throw new Error(
          "Missing body in streaming response - cannot get reader",
        );
      }

      const reader = streamingResponse.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          setLastSystemMessageText((prev) => (prev || "") + buffer);
          buffer = "";
        }
      }
    } catch (error) {
      console.error("An error occured while streaming:", error);

      setLastSystemMessageText(undefined);
    }

    setIsStreaming(false);
  };

  return {
    messages,
    chatAsync,
    isStreaming,
    lastSystemMessageText,
  };
}
