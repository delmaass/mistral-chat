type MessageRole = "user" | "system";

export type Message = {
  id: number;
  role: MessageRole;
  text: string;
};
