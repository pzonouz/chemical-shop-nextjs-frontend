import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import PostgresAdapter from "@auth/pg-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { findUserByEmail } from "@/db/repositories/UserRepository";
import { pool } from "@/db/db";
import { User } from "@/db/types";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PostgresAdapter(pool),
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
        try {
          const user: User = (await findUserByEmail(
            credentials.email as string
          )) as User;
          if (!user) {
            return null;
          }
          const match = bcrypt.compareSync(
            credentials?.password! as string,
            user.hashedPassword!
          );
          if (match) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/api/auth/credential-signin" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session!.user!.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
