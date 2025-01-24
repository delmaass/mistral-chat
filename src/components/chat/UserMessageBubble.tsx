import clsx from "clsx";
import { Message } from "@/types/message";

type Props = Pick<Message, "text"> & { className?: string };

export default function UserMessageBubble({ text, className }: Props) {
  return (
    <p
      className={clsx(
        "bg-brand-orange bg-opacity-20 p-4 font-medium rounded",
        className,
      )}
    >
      {text}
    </p>
  );
}
