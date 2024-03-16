"use client";

import { Product } from "@/app/types";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import { useAddToCartMutation } from "@/lib/features/api/api";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const AddToCartButtonWithCount = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(1);
  const [sum, setSum] = useState(parseInt(product.price.replace(",", "")));
  useEffect(() => {
    setSum(parseInt(product.price.replace(",", "")) * count);
  }, [count, product.price]);
  const [addToCartWithCount] = useAddToCartMutation();
  return (
    <div className=" grid grid-cols-2 grid-rows-2 items-center justify-between w-full gap-2">
      <div className=" ">{product.price} تومان</div>
      <div className="flex flex-col items-center">
        {/* <div className="max-w-fit">مجموع:</div> */}
        <div className=" indicator">
          <div>
            {textToThousandSeparated(textToNumber(product.price) * count)}
          </div>
          <div className=" indicator-item badge indicator-start bg-secondary">
            مجموع
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary col-start-1 col-end-2"
        onClick={() => {
          addToCartWithCount({ product: product.id, quantity: count });
        }}
      >
        افزودن
      </button>
      <ul className="flex text-lg leading-5 rounded-md col-start-2 col-end-3 justify-center ">
        <li
          className="p-3 cursor-pointer bg-base-300"
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          <a>+</a>
        </li>
        <li className="p-3 text-black">
          <a>{count}</a>
        </li>
        <li
          className="p-3 cursor-pointer bg-base-300"
          onClick={() => {
            setCount((count) => count - 1);
          }}
        >
          <a>-</a>
        </li>
      </ul>

      {/* <ul className="menu menu-horizontal bg-base-200 rounded-box self-end ">
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۱گرم</a>
    </li>
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۱۰گرم</a>
    </li>
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۵۰گرم</a>
    </li>
  </ul> */}
    </div>
  );
};

export default AddToCartButtonWithCount;
