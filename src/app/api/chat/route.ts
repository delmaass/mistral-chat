"use server";

import { Mistral } from "@mistralai/mistralai";
import {
  AssistantMessage,
  UserMessage,
} from "@mistralai/mistralai/models/components";
import * as z from "zod";

type Message = {
  role: "user" | "system";
  text: string;
};

const mapMessageToMistral = (
  message: Message,
):
  | (UserMessage & { role: "user" })
  | (AssistantMessage & { role: "assistant" }) => ({
  role: message.role === "system" ? ("assistant" as const) : message.role,
  content: message.text,
});

const messageSchema = z
  .object({ role: z.enum(["user", "system"]), text: z.string().nonempty() })
  .required();

const schema = z
  .object({
    messages: z.array(messageSchema).optional(),
    prompt: z.string().nonempty(),
  })
  .required();

export async function POST(request: Request) {
  const requestBody = await request.json();
  const validatedFields = schema.safeParse(requestBody);

  if (!validatedFields.success) {
    throw new Error(
      `Error parsing request body: ${validatedFields.error.message}`,
    );
  }

  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    throw new Error(
      "You must set MISTRAL_API_KEY in .env.local before continuing",
    );
  }

  const client = new Mistral({ apiKey: apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await client.chat.stream({
          model: "mistral-small-latest",
          messages: [
            ...(validatedFields.data.messages &&
            validatedFields.data.messages.length
              ? validatedFields.data.messages.map(mapMessageToMistral)
              : []),
            { role: "user", content: validatedFields.data.prompt },
          ],
        });

        for await (const chunk of result) {
          const streamText = chunk.data.choices[0].delta.content as string;

          controller.enqueue(new TextEncoder().encode(streamText));
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
