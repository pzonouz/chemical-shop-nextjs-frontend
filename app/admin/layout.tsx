"use client";

import { useFetchUserQuery } from "@/lib/features/api/api";
import AdminMenu from "../components/admin/AdminMenu";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isError } = useFetchUserQuery();

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
