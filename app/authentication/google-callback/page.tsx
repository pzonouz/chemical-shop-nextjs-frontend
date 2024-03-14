"use client";
import errorToast from "@/app/utils/ErrorToast";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useSearchParams } from "next/navigation";
import { unknown } from "zod";

export default function GoogleCallback() {
  const sendToBackend = async (state: string, code: string) => {
    const data = { state: state, code: code };
    setLoading();
    try {
      const res = await fetch("/api/auth/o/google-oauth2/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      });
      unsetLoading();
      const resData = await res.json();
      if (!res.ok) {
        throw new Error((res as any).error);
      }
    } catch (err) {
      errorToast((err as any)?.message!);
    }
  };
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  sendToBackend(state!, code!);

  return <></>;
}
