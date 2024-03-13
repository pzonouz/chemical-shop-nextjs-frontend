"use client";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useSearchParams } from "next/navigation";

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
      if (!res.ok) {
        const resData = await res.json();
        console.log(resData);
        throw new Error();
      }
      console.log(res);
    } catch (e) {}
  };
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  sendToBackend(state!, code!);

  return <></>;
}
