"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
  .object({
    prompt: z.string().nonempty(),
  })
  .required();

export default function InputForm() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <form className="flex flex-row gap-4 items-center">
      <input
        {...register("prompt")}
        className="flex-1 bg-brand-orange bg-opacity-20 p-4 rounded font-medium focus:outline-brand-orange"
        placeholder="Ask something"
      />

      <SendHorizonal
        className={clsx(
          "text-onbase-primary",
          errors && errors.prompt && "opacity-20",
        )}
        size={24}
      />
    </form>
  );
}
