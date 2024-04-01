"use client";
import { Order } from "@/app/types";
import {
  useDeleteOrderMutation,
  useFetchAdminOrdersQuery,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { MdNextPlan } from "react-icons/md";
import errorToast from "@/app/utils/ErrorToast";

const AdminOrderTable = () => {
  const { data: orders, isFetching } = useFetchAdminOrdersQuery();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();
  const [orderToDelete, setOrderToDelete] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
    isLoading ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [dispatch, isFetching, isLoading]);

  return (
    <div className="overflow-x-auto w-full rounded-lg">
      <table className="table w-full">
        <thead className="w-full">
          <tr className="bg-base-200 w-full flex justify-between border-b-2 border-gray-700">
            <th className=" w-1/2">نام</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: Order) => (
            <React.Fragment key={order.id}>
              <tr className="flex bg-base-200 w-full justify-between items-center border-b-2 border-gray-700">
                <td className=" w-1/2">
                  {order.cart_items.map((item) => (
                    <p key={item?.product?.id}>
                      {item.product?.name} - {item.quantity}
                    </p>
                  ))}
                </td>
                <td className=" flex gap-4 items-center">
                  {order?.processes?.length ? null : (
                    <p className=" text-xs">آماده پردازش</p>
                  )}
                </td>
                <td className=" flex gap-4 items-center">
                  <MdNextPlan className=" text-success text-lg" />
                  <RiDeleteBin2Line
                    className="text-xl text-error cursor-pointer"
                    onClick={() => {
                      setOrderToDelete(order.id);
                      (
                        document.getElementById("delete_order") as any
                      )?.showModal();
                    }}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* delete window */}
      <dialog id="delete_order" className="modal modal-bottom sm:modal-middle">
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
                onClick={() => {
                  deleteOrder(parseInt(orderToDelete))
                    .unwrap()
                    .catch((err) => {
                      errorToast(err.originalStatus);
                    });
                }}
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

export default AdminOrderTable;
