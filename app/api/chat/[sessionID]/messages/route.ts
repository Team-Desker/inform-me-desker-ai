import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ sessionID: string }> }
) => {
  const { sessionID } = await params;

  // session이 없는 경우는 에러처리 필요 -> findmany에서 없는 경우는 빈배열

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId: sessionID },
      orderBy: { createdAt: "asc" },
    });

    const uiMessages = messages.map((msg) => ({
      id: msg.id,
      role: msg.sender === "VISITOR" ? "user" : "assistant",
      parts: msg.content ? JSON.parse(msg.content) : [],
    }));

    return NextResponse.json({ messages: uiMessages });
  } catch (error) {
    console.error("메세지 불러오기 에러: ", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "채팅방 메시지 조회하는데 실패했습니다.",
        },
      },
      { status: 500 }
    );
  }
};
