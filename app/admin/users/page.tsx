"use client";
import { useState } from "react";

import AdminUserTable from "@/app/components/admin/AdminUserTable";

export default function UsersPage() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <AdminUserTable />
    </div>
  );
}
