"use client";

import { Message } from "@/components/chat/MessageListItem";
import ExamplesView from "../examples/ExamplesView";
import InputForm from "./InputForm";
import MessagesView from "./MessagesView";

export default function ChatView() {
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
