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
    const lastMessageId =
      messages.length > 0 ? messages[messages.length - 1].id : 0;

    const messagesPlusLastSystemMessage = [
      ...messages,
      ...(lastSystemMessageText !== undefined
        ? [
            {
              id: lastMessageId + 1,
              role: "system" as const,
              text: lastSystemMessageText,
            },
          ]
        : []),
    ];

    setMessages([
      ...messagesPlusLastSystemMessage,
      {
        id: lastMessageId + (lastSystemMessageText !== undefined ? 2 : 1),
        role: "user",
        text: prompt,
      },
    ]);
    setLastSystemMessageText(undefined);
    setIsStreaming(true);

    try {
      const streamingResponse = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: messagesPlusLastSystemMessage,
          prompt,
        }),
      });

      if (!streamingResponse.body) {
        throw new Error(
          "Missing body in streaming response - cannot get reader",
        );
      }

      const reader = streamingResponse.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          setLastSystemMessageText(accumulatedText);
        }
      }

      const final = decoder.decode();
      if (final) {
        accumulatedText += final;
        setLastSystemMessageText(accumulatedText);
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
