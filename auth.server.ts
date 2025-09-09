import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(c) {
      const email = (c?.email ?? "") as string;
      const password = (c?.password ?? "") as string;

      if (!email || !password) return null;

      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (!user) return null;

      const bot = await prisma.chatbot.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });
      if (!bot) return null;

      return {
        id: user.id,
        botId: bot.id,
      };
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: { signIn: "/login" },
});
