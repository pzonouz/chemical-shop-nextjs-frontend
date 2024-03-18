"use client";
import errorToast from "@/app/utils/ErrorToast";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  const dispatch = useAppDispatch();
  const sendToBackend = async (state: string, code: string) => {
    const data = { state: state, code: code };
    try {
      dispatch(setLoading());
      const res = await fetch("/api/auth/o/google-oauth2/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      dispatch(unsetLoading());
      window.location.href = "http://localhost";
    } catch (err: any) {
      errorToast(err.message);
      dispatch(unsetLoading());
    }
  };
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  sendToBackend(state!, code!);

  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-base-300 z-40 opacity-80">
      <div className="loading loading-spinner fixed top-1/2 right-1/2 text-primary w-16 h-16 z-50 translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
