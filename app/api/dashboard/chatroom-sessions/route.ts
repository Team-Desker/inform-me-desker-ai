import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const GET = async (_req: NextRequest) => {
  try {
    const userSession = await auth();
    const userId =
      userSession && userSession.user && "id" in userSession.user
        ? userSession.user.id
        : null;

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            code: "LOGIN_REQUIRED",
            message: "로그인이 필요합니다.",
          },
        },
        { status: 401 }
      );
    }

    const userChatbot = await prisma.chatbot.findFirst({
      where: { userId: userId },
      select: { id: true, name: true },
    });

    if (!userChatbot) {
      return NextResponse.json(
        {
          error: {
            code: "CHATBOT_NOT_FOUND",
            message: "연결된 해당 챗봇이 존재하지 않습니다.",
          },
        },
        { status: 404 }
      );
    }

    const chatBotSessions = await prisma.chatSession.findMany({
      where: { botId: userChatbot.id },
      select: {
        id: true,
        visitorId: true,
        isRead: true,
        createdAt: true,
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: { id: true, sender: true, content: true, createdAt: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { data: chatBotSessions, message: "대화목록을 조회하였습니다." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "CHAT_LIST_FETCH_FAILURE",
          message: "대화목록 조회가 실패하였습니다.",
        },
      },
      { status: 500 }
    );
  }
};
