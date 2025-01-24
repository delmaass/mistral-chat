import MessageListItem from "@/components/chat/MessageListItem";
import { Message } from "@/types/message";
import SystemMessageBubble from "./SystemMessageBubble";

type Props = {
  messages: Message[];
  isStreaming: boolean;
  lastSystemMessageText: string;
};

export default function MessagesView({
  messages,
  isStreaming,
  lastSystemMessageText,
}: Props) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {messages.map(({ id, role, text }) => (
        <MessageListItem key={id} role={role} text={text} />
      ))}

      {(isStreaming || lastSystemMessageText) && (
        <SystemMessageBubble
          text={lastSystemMessageText}
          isStreaming={isStreaming}
        />
      )}
    </div>
  );
}
