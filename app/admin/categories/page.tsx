"use client";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

import AdminCategoryForm from "@/app/components/admin/AdminCategoryForm";
import AdminCategoryTable from "@/app/components/admin/AdminCategoryTable";

export default function CategoriesPage() {
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
      {visible && <AdminCategoryForm />}
      <AdminCategoryTable />
    </div>
  );
}
