import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/prisma";
import bcrypt, { compare } from "bcrypt";
import { IoEllipseSharp } from "react-icons/io5";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        console.log(user);
        if (!user) {
          return null;
        }
        const match = await bcrypt.compare(
          credentials?.password!,
          user.hashedPassword!
        );
        console.log(compare);
        if (match) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/api/auth/credential-signin" },
  callbacks: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
