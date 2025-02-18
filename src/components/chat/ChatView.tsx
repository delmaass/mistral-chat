"use client";

import { useEffect, useRef } from "react";
import ExamplesView from "../examples/ExamplesView";
import InputForm from "./InputForm";
import MessagesView from "./MessagesView";
import useChat from "@/hooks/useChat";

export default function ChatView() {
  const { messages, chatAsync, isStreaming, lastSystemMessageText } = useChat();
  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesContainer.current?.scrollTo({
      top: messagesContainer.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isStreaming, lastSystemMessageText]);

  return (
    <div className="flex flex-col flex-1 overflow-auto gap-4">
      <div
        className="flex flex-col flex-1 overflow-y-scroll gap-4 pr-4"
        ref={messagesContainer}
      >
        {messages.length ? (
          <MessagesView
            messages={messages}
            isStreaming={isStreaming}
            lastSystemMessageText={lastSystemMessageText || ""}
          />
        ) : (
          <ExamplesView onPressItem={chatAsync} />
        )}
      </div>

      <InputForm onSubmit={chatAsync} />
    </div>
  );
}
