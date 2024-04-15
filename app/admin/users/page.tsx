"use client";

import AdminUserTable from "@/app/components/admin/AdminUserTable";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <AdminUserTable />
    </div>
  );
}
