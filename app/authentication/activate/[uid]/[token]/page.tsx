"use client";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useActivateUserQuery } from "@/lib/features/api/api";

export default function ActivatePage({
  params: { uid, token },
}: {
  params: { uid: string; token: string };
}) {
  const { isFetching, isSuccess, isError, error } = useActivateUserQuery({
    uid: uid,
    token: token,
  });
  if (isSuccess) {
    successToast();
    setTimeout((e) => {}, 2000);
  }
  if (isError) {
    errorToast(JSON.stringify((error as any)?.data));
  }
}
