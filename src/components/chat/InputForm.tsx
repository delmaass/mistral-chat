"use client";

import { SendHorizonal } from "lucide-react";

export default function InputForm() {
  return (
    <div className="flex flex-row gap-4 items-center">
      <input
        className="flex-1 bg-brand-orange bg-opacity-20 p-4 rounded font-medium focus:outline-brand-orange"
        placeholder="Ask something"
      />

      <SendHorizonal className="text-onbase-primary opacity-60" size={24} />
    </div>
  );
}
