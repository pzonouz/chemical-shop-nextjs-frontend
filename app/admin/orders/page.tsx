"use client";

import AdminOrderTable from "@/app/components/admin/AdminOrderTable";
export default function OrderPage() {
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <AdminOrderTable />
    </div>
  );
}
