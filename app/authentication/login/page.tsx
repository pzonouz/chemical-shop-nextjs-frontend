"use client";
import LoginForm from "@/app/components/auth/LoginForm";
import errorToast from "@/app/utils/ErrorToast";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";

import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

export default function SignInPage() {
  const dispatch = useDispatch();
  return (
    <div className="mx-8 mt-4 flex flex-col items-center gap-4">
      <button
        className="btn w-full mt-20  flex flex-row items-center gap-2"
        onClick={async () => {
          dispatch(setLoading());
          try {
            const res = await fetch(
              "/api/auth/o/google-oauth2/?redirect_uri=http://localhost/authentication/google-callback",
              { cache: "no-store" },
            );
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            dispatch(unsetLoading());
            const data = await res.json();
            window.location = data.authorization_url;
          } catch (err: any) {
            errorToast(err.message);
            dispatch(unsetLoading());
          }
        }}
      >
        <FcGoogle className=" text-3xl" />
        <div>ورود با گوگل</div>
      </button>
      <LoginForm />
    </div>
  );
}
