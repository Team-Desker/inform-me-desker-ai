import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { botId, visitorId } = await req.json();

    if (!botId || !visitorId) {
      return NextResponse.json(
        {
          error: {
            code: "NOT_FOUND_BOTID_VISITORID",
            message: "해당 봇이나 방문객을 찾을 수 없습니다",
          },
        },
        { status: 400 }
      );
    }

    const latestSession = await prisma.chatSession.findFirst({
      where: {
        visitorId,
        botId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latestSession) {
      return NextResponse.json(
        {
          chatSessionId: latestSession.id,
          isNewChat: false,
        },
        { status: 200 }
      );
    }

    const newChatSession = await prisma.chatSession.create({
      data: {
        botId,
        visitorId,
      },
    });

    return NextResponse.json(
      {
        chatSessionId: newChatSession.id,
        isNewChat: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("chat session 생성 에러: ", error);
    return NextResponse.json(
      {
        error: {
          code: "ERROR_CHAT_SESSION_CREATION",
          message: "새로운 채팅방 생성하는데 실패했습니다",
        },
      },
      { status: 500 }
    );
  }
};
