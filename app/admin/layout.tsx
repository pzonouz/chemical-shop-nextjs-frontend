"use client";

import { useFetchUserQuery } from "@/lib/features/api/api";
import AdminMenu from "../components/admin/AdminMenu";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { data: user, isError, isFetching } = useFetchUserQuery();
  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading());
    }
    if (!isFetching) {
      dispatch(unsetLoading());
    }
  }, [dispatch, isFetching]);

  if (isError) {
    return redirect("/authentication/login");
  }
  if (!user?.is_staff) {
    return <div className="p-8">شما مجاز به ورود نیستید</div>;
  }

  return (
    <main className="mt-6 px-2 flex flex-row gap-3">
      <AdminMenu />
      {children}
    </main>
  );
}
