import clsx from "clsx";
import Icon from "../Icon";
import { Message } from "@/types/message";
import Markdown from "react-markdown";

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
      <div className="rounded-full border border-brand-orange border-opacity-20 size-12 flex items-center justify-center flex-shrink-0">
        <Icon size={24} />
      </div>

      <div className="font-medium pt-3 flex-1">
        <Markdown
          className="prose max-w-none"
          components={{
            a: ({ children, href }) => {
              // This is a hacky way to render the streaming indicator circle next to the last word
              if (href === "streaming") {
                return (
                  <span className="bg-onbase-primary size-4 rounded-full align-middle -translate-y-[0.5px] inline-block" />
                );
              }

              return <a href={href}>{children}</a>;
            },
          }}
        >
          {isStreaming ? `${text}[](streaming)` : text}
        </Markdown>
      </div>
    </div>
  );
}
