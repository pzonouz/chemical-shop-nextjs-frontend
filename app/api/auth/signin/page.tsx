import SignInForm from "@/app/components/auth/SignInForm";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();
  return <SignInForm providers={providers} />;
}
