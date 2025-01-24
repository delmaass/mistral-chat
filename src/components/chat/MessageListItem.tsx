import clsx from "clsx";
import SystemMessageBubble from "./SystemMessageBubble";
import UserMessageBubble from "./UserMessageBubble";
import { Message } from "@/types/message";

type Props = Omit<Message, "id">;

export default function MessageListItem({ role, text }: Props) {
  return (
    <div
      className={clsx("w-full flex flex-row", role === "user" && "justify-end")}
    >
      {role === "system" && <SystemMessageBubble text={text} />}
      {role === "user" && (
        <UserMessageBubble text={text} className="max-w-[512px]" />
      )}
    </div>
  );
}
