import SignInForm from "@/app/components/auth/SignInForm";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { type NextRequest, NextResponse } from "next/server";

export default async function SignInPage(request: NextRequest) {
  const providers = await getProviders();
  return <SignInForm providers={providers} />;
}
