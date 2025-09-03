import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { saveChat } from "@/lib/chat-store";

export const POST = async (req: Request) => {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();
  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: ({ messages }) => {
      saveChat({ chatId: id, messages });
    },
  });
};
