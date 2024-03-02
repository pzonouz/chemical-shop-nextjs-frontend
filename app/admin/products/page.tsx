"use client";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

import AdminProductForm from "@/app/components/admin/AdminProductForm";
import AdminProductTable from "@/app/components/admin/AdminProductTable";

export default function ProductsPage() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      {!visible && (
        <FaPlusCircle
          className="text-2xl text-success cursor-pointer"
          onClick={() => setVisible(true)}
        />
      )}
      {visible && (
        <FaMinusCircle
          className="text-2xl text-error cursor-pointer"
          onClick={() => setVisible(false)}
        />
      )}
      {visible && <AdminProductForm product={null} />}
      <AdminProductTable />
    </div>
  );
}
