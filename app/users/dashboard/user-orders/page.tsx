/* eslint-disable @next/next/no-img-element */
"use client";
import { Order } from "@/app/types";
import { Cart } from "@/app/types";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import { MdCheckCircleOutline } from "react-icons/md";
import { useFetchOrdersQuery } from "@/lib/features/api/api";
import moment from "jalali-moment";
import { OrderStatusCalculator } from "@/app/components/utils/OrderStatusCalculator";

export default function UserOrdersPage() {
  const { data: orders, isFetching } = useFetchOrdersQuery();
  return (
    <div className="p-4 bg-base-200 rounded-xl w-full flex flex-col gap-2 items-center ">
      <div>سفارشات شما:</div>
      {orders?.map((order: Order) => (
        <>
          <div
            key={order.id}
            className=" w-full p-2 grid grid-cols-2 grid-row-3 gap-2 "
          >
            <div className=" col-start-1 col-end-2 row-start-1 row-end-2">
              {OrderStatusCalculator(order)}
            </div>
            <div className=" flex flex-row gap-1 text-xs col-start-1 col-end-2 row-start-2 row-end-3">
              <div className=" text-black">کد سفارش:</div>
              <div>{ToPersianDigit(order.id)}</div>
            </div>
            <div className=" text-gray-600 text-xs col-start-1 col-end-2 row-start-3 row-end-4">
              <div>
                {ToPersianDigit(
                  moment(order.created_at).locale("fa").format("YYYY/MM/DD")
                )}
              </div>
            </div>
            <div className=" text-xs text-error col-start-2 col-end-3 row-start-3 row-end-4 place-self-end">
              {ToPersianDigit(
                order.cart_items
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      parseInt(
                        currentValue?.product?.price?.replaceAll(",", "")!
                      ) *
                        parseInt(currentValue.quantity)
                    );
                  }, 0)
                  .toLocaleString("en-Us")
              )}{" "}
              {"تومان"}
            </div>
          </div>
          <div className=" border-b-2 border-gray-500 p-2 w-full flex flex-col gap-2 text-xs">
            {order.cart_items.map((item) => (
              <div
                key={item.id}
                className=" flex gap-2 items-center justify-center"
              >
                <img
                  src={item?.product?.image}
                  alt={item?.product?.name}
                  className=" w-1/4"
                />
                <div className=" w-1/2">{item?.product?.name}</div>
                <div className=" w-1/2 flex items-center">
                  <div>{ToPersianDigit(item?.product?.price!)}</div>
                  <div> {"  تومان  "}</div>
                </div>
                <div className=" w-1/4 ">
                  {"  *  "}
                  {ToPersianDigit(item?.quantity)}
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
