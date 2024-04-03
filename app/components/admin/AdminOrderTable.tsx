"use client";
import { Order } from "@/app/types";
import {
  useDeleteOrderMutation,
  useFetchAdminOrdersQuery,
  useOrderNextMutation,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { MdNextPlan } from "react-icons/md";
import errorToast from "@/app/utils/ErrorToast";
import {
  OrderStatusCalculator,
  OrderNextStatusCalculator,
} from "@/app/utils/OrderStatusCalculator";
import classNames from "classnames";

const AdminOrderTable = () => {
  const { data: orders, isFetching } = useFetchAdminOrdersQuery();
  const [deleteOrder, { isLoading: OrderDeleteIsLoading }] =
    useDeleteOrderMutation();
  const [nextOrder, { isLoading: OrderNextIsLoading }] = useOrderNextMutation();
  const [orderToDelete, setOrderToDelete] = useState("");
  const [orderToNext, setOrderToNext] = useState<Order>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
    OrderDeleteIsLoading || OrderNextIsLoading
      ? dispatch(setLoading())
      : dispatch(unsetLoading());
  }, [dispatch, isFetching, OrderDeleteIsLoading, OrderNextIsLoading]);

  useEffect(() => {
    console.log(orderToNext);
  }, [orderToNext]);
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
                  {OrderStatusCalculator(order)}
                </td>
                <td className=" flex gap-4 items-center">
                  <MdNextPlan
                    className={classNames({
                      " text-success text-lg cursor-pointer":
                        order.processes.length < 3,
                      " btn-disabled": order.processes.length > 3,
                    })}
                    onClick={() => {
                      setOrderToNext(order);
                      (
                        document.getElementById("next_order") as any
                      )?.showModal();
                    }}
                  />
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
      {/* next window */}
      <dialog id="next_order" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4">{OrderNextStatusCalculator(orderToNext!)}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className=" flex flex-row gap-2 ite justify-around w-full"
            >
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-error text-error-content"
                onClick={() => {
                  nextOrder(parseInt(orderToNext?.id))
                    .unwrap()
                    .catch((err) => {
                      console.log(err);
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
