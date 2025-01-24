"use server";

import { Mistral } from "@mistralai/mistralai";
import * as z from "zod";

const schema = z.object({ prompt: z.string().nonempty() }).required();

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
          messages: [{ role: "user", content: validatedFields.data.prompt }],
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
