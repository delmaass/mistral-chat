import clsx from "clsx";
import Icon from "../Icon";
import { Message } from "@/types/message";

type Props = Pick<Message, "text"> & {
  className?: string;
  isStreaming?: boolean;
};

export default function SystemMessageBubble({
  text,
  className,
  isStreaming,
}: Props) {
  return (
    <div className={clsx("flex flex-row gap-4", className)}>
      <div className="rounded-full border border-brand-orange border-opacity-20 size-12 flex items-center justify-center">
        <Icon size={24} />
      </div>

      <p className="font-medium pt-3 flex-1">
        {text}
        {isStreaming && (
          <span className="bg-onbase-primary size-4 rounded-full align-middle -translate-y-[0.5px] inline-block" />
        )}
      </p>
    </div>
  );
}
