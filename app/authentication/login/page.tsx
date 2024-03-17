"use client";
import LoginForm from "@/app/components/auth/LoginForm";
import { useFetchUserQuery } from "@/lib/features/api/api";
import { setLoading } from "@/lib/features/utils/loading";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  return (
    <div className="mx-8 mt-4 flex flex-col items-center gap-4">
      <button
        className="btn w-full mt-20  flex flex-row items-center gap-2"
        onClick={async () => {
          setLoading();
          const res = await fetch(
            "/api/auth/o/google-oauth2/?redirect_uri=http://localhost/authentication/google-callback"
          );
          if (!res.ok) {
          }
          const data = await res.json();
          window.location = data.authorization_url;
        }}
      >
        <FcGoogle className=" text-3xl" />
        <div>ورود با گوگل</div>
      </button>
      <LoginForm />
    </div>
  );
}
