/* eslint-disable @next/next/no-img-element */
"use client";
import { Order } from "@/app/types";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import { useFetchOrdersQuery } from "@/lib/features/api/api";
import moment from "jalali-moment";
import { OrderStatusCalculator } from "@/app/components/utils/OrderStatusCalculator";

export default function UserOrdersPage() {
  const { data: orders } = useFetchOrdersQuery();
  return (
    <div className="p-4 bg-base-200 rounded-xl w-full  ">
      <div>سفارشات شما:</div>
      <div className="grid grid-col-1 gap-2 items-end ">
        {orders?.map((order: Order) => (
          <div
            key={order.id}
            className=" w-full p-2 md:p-4 bg-base-100 rounded-md"
          >
            <div className="grid grid-cols-2 grid-row-3 md:grid-cols-4 md:grid-rows-1 gap-2">
              <div className=" col-start-1 col-end-2 row-start-1 row-end-2">
                {OrderStatusCalculator(order)}
              </div>
              <div className=" flex flex-row gap-1 text-xs col-start-1 col-end-2 row-start-2 row-end-3 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
                <div className=" text-black">کد سفارش:</div>
                <div>{ToPersianDigit(order.id)}</div>
              </div>
              <div className=" text-gray-600 text-xs col-start-1 col-end-2 row-start-3 row-end-4 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2">
                <div>
                  {ToPersianDigit(
                    moment(order.created_at).locale("fa").format("YYYY/MM/DD"),
                  )}
                </div>
              </div>
              <div className=" text-xs text-error col-start-2 col-end-3 row-start-3 row-end-4 md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2 place-self-end">
                {ToPersianDigit(
                  order.cart_items
                    .reduce((accumulator, currentValue) => {
                      return (
                        accumulator +
                        parseInt(
                          currentValue?.product?.price?.replaceAll(",", "")!,
                        ) *
                          parseInt(currentValue.quantity)
                      );
                    }, 0)
                    .toLocaleString("en-Us"),
                )}{" "}
                {"تومان"}
              </div>
            </div>
            <div className=" py-3 w-full flex flex-col gap-3 text-xs max-w-lg">
              {order.cart_items.map((item) => (
                <div
                  key={item.id}
                  className=" flex gap-3 items-center justify-between w-full"
                >
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    className=" w-20 rounded-md"
                  />
                  <div className=" w-1/2 max-w-xs">{item?.product?.name}</div>
                  <div className=" flex items-center w-1/2 max-w-xs">
                    <div>{ToPersianDigit(item?.product?.price!)}</div>
                    <div> {"  تومان  "}</div>
                    <div className="">
                      {"  *  "}
                      {ToPersianDigit(item?.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
