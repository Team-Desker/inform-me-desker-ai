import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validators/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SIGNUP_STATUS } from "config/constants";

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const validatedData = signUpSchema.safeParse(json);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: SIGNUP_STATUS.ERROR.INVALID_INPUT },
        { status: 400 }
      );
    }

    const { email, password, phoneNumber } = validatedData.data;
    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) {
      return NextResponse.json(
        { message: SIGNUP_STATUS.ERROR.EMAIL_ALREADY_EXISTS },
        { status: 409 }
      );
    }
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        phoneNumber,
      },
      select: { id: true, email: true, phoneNumber: true, createdAt: true },
    });

    return NextResponse.json(
      { data: user, message: SIGNUP_STATUS.SUCCESS.CREATE },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: SIGNUP_STATUS.ERROR.SIGNUP_SERVER_ERROR },
      { status: 500 }
    );
  }
};
