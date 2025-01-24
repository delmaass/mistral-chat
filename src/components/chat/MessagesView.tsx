import MessageListItem, {
  type Message,
} from "@/components/chat/MessageListItem";

type Props = {
  messages: Message[];
};

export default function MessagesView({ messages }: Props) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {messages.map(({ id, role, text }) => (
        <MessageListItem key={id} role={role} text={text} />
      ))}
    </div>
  );
}
