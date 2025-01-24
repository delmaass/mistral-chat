import clsx from "clsx";
import Icon from "../Icon";
import { Message } from "@/types/message";

type Props = Pick<Message, "text"> & { className?: string };

export default function SystemMessageBubble({ text, className }: Props) {
  return (
    <div className={clsx("flex flex-row gap-4", className)}>
      <div className="rounded-full border border-brand-orange border-opacity-20 size-12 flex items-center justify-center">
        <Icon size={24} />
      </div>

      <p className="font-medium pt-3 flex flex-1">{text}</p>
    </div>
  );
}
