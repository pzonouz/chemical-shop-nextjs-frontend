/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";
import AdminProductForm from "./AdminProductForm";
import classNames from "classnames";
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import { Product } from "@/app/types";

const AdminProductTable = () => {
  const { data: products, isFetching } = useFetchProductsQuery();
  const [productToDelete, setProductToDelete] = useState("");
  const [editVisible, setEditVisible] = useState("");
  const [deleteProduct] = useDeleteProductMutation();

  const onDeleteProduct = () => {
    deleteProduct(productToDelete)
      .then((res: any) => {
        if (res.error) {
          throw new Error(res.error?.originalStatus);
        }
        successToast();
      })
      .catch((err) => {
        ErrorToast(err.message);
      });
  };

  useEffect(() => {
    isFetching ? setLoading() : unsetLoading();
  }, [isFetching]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead className="w-full">
          <tr className="bg-base-200 w-full flex justify-between">
            <th className=" w-1/2">نام</th>
            <th className=" w-1/4">قیمت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product) => (
            <React.Fragment key={product.id}>
              <tr className="flex bg-base-200 w-full justify-between items-center">
                <td className=" w-1/2">{product?.name} </td>
                <td className=" w-1/4">
                  {product.price}
                  {/* <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      {product.image && (
                        <img src={product?.image} alt={product?.name!} />
                      )}
                    </div>
                  </div> */}
                </td>
                <td className=" flex gap-4 items-center">
                  <RiEdit2Line
                    className={classNames({
                      "text-xl text-info cursor-pointer": true,
                      "bg-error": editVisible === product?.id,
                    })}
                    onClick={() => {
                      if (editVisible === product?.id!) {
                        setEditVisible("");
                      }
                      if (editVisible !== product?.id!) {
                        setEditVisible(product?.id!);
                      }
                    }}
                  />
                  <RiDeleteBin2Line
                    className="text-xl text-error cursor-pointer"
                    onClick={() => {
                      setProductToDelete(product?.id!);
                      (
                        document.getElementById("my_modal_5") as any
                      )?.showModal();
                    }}
                  />
                </td>
              </tr>
              {editVisible === product.id && (
                <tr className=" w-full">
                  <td className="w-full">
                    <AdminProductForm product={product} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* delete window */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4">پاک شود؟</p>
          <div className="modal-action">
            <form
              method="dialog"
              className=" flex flex-row gap-2 ite justify-around w-full"
            >
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-error text-error-content"
                onClick={onDeleteProduct}
              >
                تایید
              </button>
              <button className="btn btn-neutral">نه</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default AdminProductTable;
