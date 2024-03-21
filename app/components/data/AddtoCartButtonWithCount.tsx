"use client";

import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import { useAddToCartMutation } from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddToCartButtonWithCount = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const router = useRouter();

  const [addToCartWithCount] = useAddToCartMutation();
  return (
    <div className=" grid grid-cols-2 grid-rows-2 items-center justify-between w-full gap-2">
      <div className=" ">{ToPersianDigit(product?.price)} تومان</div>
      <div className="flex justify-center gap-2 ">
        <div className=" text-error">
          {ToPersianDigit(
            textToThousandSeparated(
              textToNumber(product?.price) * count
            ) as string
          )}{" "}
          تومان
        </div>
      </div>
      <button
        className="btn btn-primary col-start-1 col-end-2"
        onClick={() => {
          dispatch(setLoading());
          addToCartWithCount({ product_id: product?.id, quantity: count })
            .unwrap()
            .then(() => {
              dispatch(unsetLoading());
              successToast();
            })
            .catch((err) => {
              if (err.status == 401) {
                dispatch(unsetLoading());
                errorToast("باید ابتدا وارد شوید");
                router.push("/authentication/login/");
              }
              errorToast(err?.message);
            });
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
          <a>{ToPersianDigit(count.toString())}</a>
        </li>
        <li
          className="p-3 cursor-pointer bg-base-300"
          onClick={() => {
            setCount((count) => {
              if (count < 2) {
                return 1;
              }
              return count - 1;
            });
          }}
        >
          <a>-</a>
        </li>
      </ul>
    </div>
  );
};

export default AddToCartButtonWithCount;
