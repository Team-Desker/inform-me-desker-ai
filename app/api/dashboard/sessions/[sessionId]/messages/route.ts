import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/config/constants";

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
            message: ERROR_MESSAGE.LOGIN_REQUIRED,
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
            message: ERROR_MESSAGE.CHATBOT_NOT_FOUND,
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
            message: ERROR_MESSAGE.CHAT_LIST_FETCH_FAILURE,
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
        message: SUCCESS_MESSAGE.MESSAGE_FETCH,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "MESSAGE_FETCH_FAILURE",
          message: ERROR_MESSAGE.MESSAGE_FETCH_FAILURE,
        },
      },
      { status: 500 }
    );
  }
};
