"use client";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useActivateUserQuery } from "@/lib/features/api/api";

export default function ActivatePage({
  params: { uid, token },
}: {
  params: { uid: string; token: string };
}) {
  const { isSuccess, isError, error } = useActivateUserQuery({
    uid: uid,
    token: token,
  });
  if (isSuccess) {
    successToast();
    setTimeout(() => {}, 2000);
  }
  // TODO
  if (isError) {
    errorToast(JSON.stringify((error as any)?.data));
  }
}
