"use client";

import ExamplesView from "../examples/ExamplesView";
import InputForm from "./InputForm";
import MessagesView from "./MessagesView";
import useChat from "@/hooks/useChat";

export default function ChatView() {
  const { messages } = useChat();

  return (
    <div className="flex flex-col flex-1 gap-4">
      {messages.length ? (
        <MessagesView messages={messages} />
      ) : (
        <ExamplesView />
      )}

      <InputForm />
    </div>
  );
}
