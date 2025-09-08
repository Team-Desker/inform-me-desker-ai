import { ERROR_MESSAGE } from "@/config/constants";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND_USERID",
          message: ERROR_MESSAGE.NOT_FOUND_USERID,
        },
      },
      { status: 400 }
    );
  }

  try {
    const chatbot = await prisma.chatbot.findFirst({
      where: { userId },
    });

    if (chatbot) {
      return NextResponse.json(chatbot, { status: 200 });
    } else {
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
  } catch (error) {
    console.error("Error fetching chatbot settings:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR_CHATBOT",
          message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR_CHATBOT,
        },
      },
      { status: 500 }
    );
  }
}
