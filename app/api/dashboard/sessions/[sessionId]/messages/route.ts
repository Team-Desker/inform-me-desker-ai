import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { sessionId: string } }
) => {
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

    const { sessionId } = await params;
    const chatBotSessions = await prisma.chatSession.findFirst({
      where: { id: sessionId, botId: userChatbot.id },
      select: {
        id: true,
        visitorId: true,
        isRead: true,
        createdAt: true,
      },
    });

    if (!chatBotSessions) {
      return NextResponse.json(
        {
          error: {
            code: "CHAT_LIST_FETCH_FAILURE",
            message: "대화목록 조회가 실패하였습니다.",
          },
        },
        { status: 404 }
      );
    }

    const chatMessages = await prisma.chatMessage.findMany({
      where: { sessionId: chatBotSessions.id },
      orderBy: { createdAt: "asc" },
      select: { id: true, sender: true, content: true, createdAt: true },
    });

    const parsedMessage = chatMessages.map((message) => {
      const parsedContentMessage = JSON.parse(message.content);
      return {
        messageId: message.id,
        sender: message.sender,
        content: parsedContentMessage,
        createdAt: message.createdAt,
      };
    });

    return NextResponse.json(
      {
        data: {
          session: {
            sessionId: chatBotSessions.id,
            visitorId: chatBotSessions.visitorId,
            isRead: chatBotSessions.isRead,
          },
          parsedMessage,
        },
        message: "상세 대화 조회하였습니다.",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "MESSAGE_FETCH_FAILURE",
          message: "상세 대화 조회가 실패하였습니다.",
        },
      },
      { status: 500 }
    );
  }
};
