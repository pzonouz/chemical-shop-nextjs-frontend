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
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import {
  OrderStatusCalculator,
  OrderNextStatusCalculator,
} from "@/app/utils/OrderStatusCalculator";
import classNames from "classnames";
// import moment from "moment";
import moment from "jalali-moment";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";

const AdminOrderTable = () => {
  const { data: fetchedOrders, isFetching } = useFetchAdminOrdersQuery();
  const [orders, setOrders] = useState<Order[]>();
  const [deleteOrder, { isLoading: OrderDeleteIsLoading }] =
    useDeleteOrderMutation();
  const [nextOrder, { isLoading: OrderNextIsLoading }] = useOrderNextMutation();
  const [orderToDelete, setOrderToDelete] = useState("");
  const [description, setDescription] = useState("");
  const [orderToNext, setOrderToNext] = useState<Order>();
  const [visible, setVisible] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
    OrderDeleteIsLoading || OrderNextIsLoading
      ? dispatch(setLoading())
      : dispatch(unsetLoading());
  }, [dispatch, isFetching, OrderDeleteIsLoading, OrderNextIsLoading]);

  useEffect(() => {
    switch (filter) {
      case "":
        setOrders(fetchedOrders);
        break;
      case "NEW":
        setOrders(
          fetchedOrders?.filter((order) => order.processes.length == 0)
        );
        break;
      case "IN_PROGRESS":
        setOrders(
          fetchedOrders?.filter(
            (order) =>
              order.processes.length == 1 &&
              order?.processes[order.processes.length - 1]?.status == "I"
          )
        );
        break;
      case "READY_TO_SEND":
        setOrders(
          fetchedOrders?.filter(
            (order) =>
              order.processes.length == 2 &&
              order?.processes[order.processes.length - 1]?.status == "R"
          )
        );
        break;
      case "DELIVERED":
        setOrders(
          fetchedOrders?.filter(
            (order) =>
              order.processes.length == 3 &&
              order?.processes[order.processes.length - 1]?.status == "D"
          )
        );
        break;
    }
  }, [fetchedOrders, filter]);
  return (
    <div className="overflow-x-auto w-full rounded-lg">
      <select
        className="select select-bordered w-1/2 my-4 mx-4  max-w-xs"
        onChange={(e) => {
          setFilter(e.currentTarget.value);
        }}
      >
        <option value={""} selected>
          همه
        </option>
        <option value={"NEW"}>جدید</option>
        <option value={"IN_PROGRESS"}>در حال تولید</option>
        <option value={"READY_TO_SEND"}>آماده ارسال</option>
        <option value={"DELIVERED"}> ارسال شده</option>
      </select>
      <table className="table w-full">
        <thead className="w-full">
          <tr className="bg-base-200 w-full flex justify-between border-b-2 border-gray-700">
            <th className=" w-6"></th>
            <th className=" w-1/2"> نام-تعداد</th>
            <th className=" w-28">وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: Order) => (
            <React.Fragment key={order.id}>
              <tr
                className={classNames({
                  "flex bg-base-200 w-full justify-between items-center ": true,
                  "border-b-2 border-gray-700": !(visible == order.id),
                })}
              >
                <td className="w-6">
                  {!(visible == order.id) && (
                    <FaPlusCircle
                      className="text-2xl text-success cursor-pointer"
                      onClick={() => setVisible(order.id)}
                    />
                  )}
                  {visible == order.id && (
                    <FaMinusCircle
                      className="text-2xl text-error cursor-pointer"
                      onClick={() => setVisible("")}
                    />
                  )}
                </td>
                <td className=" w-1/2">
                  {order.cart_items.map((item) => (
                    <p key={item?.product?.id}>
                      {item.product?.name} -{" "}
                      {ToPersianDigit(String(item.quantity))}
                    </p>
                  ))}
                </td>
                <td className=" text-center">{OrderStatusCalculator(order)}</td>
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
              {visible == order.id && (
                <tr
                  className={classNames({
                    " flex flex-col gap-2 bg-base-200 w-full justify-between items-center p-3":
                      true,
                    "border-b-2 border-gray-700": visible == order.id,
                  })}
                >
                  <div className=" flex flex-row items-center justify-start gap-2 w-full">
                    <div>{order.user.profile?.first_name}</div>
                    <div>{order.user.profile?.last_name}</div>
                    <div>{order.user.profile?.mobile}</div>
                  </div>
                  <div className=" flex flex-row items-center justify-start gap-2 w-full">
                    <div>{order.user.profile?.address}</div>
                  </div>
                  <div className=" flex flex-row items-center justify-start gap-2 w-full">
                    <div>زمان سفارش:</div>
                    <div>
                      {ToPersianDigit(
                        moment(order.created_at)
                          .locale("fa")
                          .format("YYYY/MM/DD")
                      )}
                    </div>
                  </div>
                </tr>
              )}
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
          <div className="py-4 flex gap-1  items-center justify-center">
            <p>تبدیل به: </p>
            <p className="text-xl font-bold">
              {OrderNextStatusCalculator(orderToNext!)}
            </p>
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className=" flex flex-col gap-4 ite justify-around w-full"
            >
              <input
                id="description"
                className="input input-bordered max-w-lg"
                type="text"
                placeholder="توضیحات"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <div className=" flex justify-around items-center w-full">
                <button
                  className="btn btn-error text-error-content"
                  onClick={() => {
                    nextOrder({
                      order_id: parseInt(orderToNext?.id),
                      description: description,
                    })
                      .unwrap()
                      .catch((err) => {
                        errorToast(err.originalStatus);
                      });
                  }}
                >
                  تایید
                </button>
                <button className="btn btn-neutral">نه</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminOrderTable;
