import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validators/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SIGNUP_STATUS } from "config/constants";
import { signIn } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const validatedData = signUpSchema.safeParse(json);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: SIGNUP_STATUS.ERROR.INVALID_INPUT,
          },
        },
        { status: 400 }
      );
    }

    const { email, password, phoneNumber } = validatedData.data;
    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) {
      return NextResponse.json(
        {
          error: {
            code: "EMAIL_ALREADY_EXISTS",
            message: SIGNUP_STATUS.ERROR.EMAIL_ALREADY_EXISTS,
          },
        },
        { status: 409 }
      );
    }
    const SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        phoneNumber,
      },
      select: { id: true, email: true, phoneNumber: true, createdAt: true },
    });

    const signInResult = await signIn("credentials", {
      email: user.email,
      password,
      redirect: true,
      redirectTo: `/dashboard/${user.id}/chatbot/setting`,
    });

    if (signInResult) {
      return signInResult;
    }

    return NextResponse.json(
      { data: user, message: SIGNUP_STATUS.SUCCESS.CREATE },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "SIGNUP_SERVER_ERROR",
          message: SIGNUP_STATUS.ERROR.SIGNUP_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
};
