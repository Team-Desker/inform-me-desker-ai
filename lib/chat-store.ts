import prisma from "@/lib/prisma";
import { MESSAGE_SENDER } from "@/app/generated/prisma";
import { UIMessage } from "ai";
import { NextResponse } from "next/server";

export const saveChat = async ({
  chatId,
  messages,
}: {
  chatId: string;
  messages: UIMessage[];
}) => {
  const chatSession = await prisma.chatSession.findUnique({
    where: { id: chatId },
  });

  if (!chatSession) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "요청하신 채팅 세션을 찾을 수 없습니다.",
        },
      },
      { status: 404 }
    );
  }

  const messagesToCreate = messages.slice(-2).map((msg) => ({
    sender: msg.role === "user" ? MESSAGE_SENDER.VISITOR : MESSAGE_SENDER.AI,
    content: JSON.stringify(msg.parts),
    sessionId: chatSession.id,
  }));

  await prisma.chatMessage.createMany({
    data: messagesToCreate,
  });
};
