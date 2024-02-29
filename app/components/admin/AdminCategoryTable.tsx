/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

export interface Category {
  name: string;
  image: string;
}
const AdminCategoryTable = () => {
  const dispatch = useAppDispatch();
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const deleteCategory = () => {
    dispatch({ type: "categoryDeleteApiBegan", payload: categoryToDelete });
  };
  const categories = useAppSelector((state) => state.categories);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead className="w-full">
          <tr className="bg-base-200 w-full flex justify-between">
            <th>نام</th>
            <th>تصویر</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: Category) => (
            <tr
              key={category?.name}
              className="flex bg-base-200 w-full justify-between items-center"
            >
              <td>{category?.name} </td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={category.image} alt={category.name} />
                  </div>
                </div>
              </td>
              <td className=" flex gap-4 items-center">
                <RiEdit2Line className="text-xl text-info cursor-pointer" />
                <RiDeleteBin2Line
                  className="text-xl text-error cursor-pointer"
                  onClick={() => {
                    setCategoryToDelete(category?.name);
                    document?.getElementById("my_modal_5")?.showModal();
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* delete window */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4">پاک شود؟</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-error text-error-content"
                onClick={deleteCategory}
              >
                تایید
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default AdminCategoryTable;
