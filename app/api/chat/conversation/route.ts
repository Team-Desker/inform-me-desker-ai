import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";

export const maxDuration = 300;

export const POST = async (req: Request) => {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
