"use client";
import { useState } from "react";

import AdminOrderTable from "@/app/components/admin/AdminOrderTable";
export default function OrderPage() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <AdminOrderTable />
    </div>
  );
}
