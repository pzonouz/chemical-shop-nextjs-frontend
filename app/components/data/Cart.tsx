/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/app/types";
import { useFetchCartItemsQuery } from "@/lib/features/api/api";
import CartItem from "./CartItem";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import Link from "next/link";

const Cart = () => {
  const { data: carts, error, isError } = useFetchCartItemsQuery();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let t = 0;
    setTotal((total) => {
      carts?.map((cart: Cart) => {
        t += parseInt(cart.quantity) * textToNumber(cart?.product?.price!);
      });
      total = t;
      return total;
    });
  }, [carts]);
  return (
    <div>
      <div className=" flex gap-1 items-center justify-center text-success mt-2 w-fit">
        <p>مجموع:</p>
        <p> {textToThousandSeparated(total)} </p>
        <p>تومان</p>
      </div>
      <div className=" flex flex-col gap-2">
        {carts?.map((cart: Cart) => {
          return <CartItem key={cart.id} cart={cart} />;
        })}
      </div>
      <Link href="/checkout" className=" btn btn-success text-white mt-4">
        نهایی کردن خرید
      </Link>
    </div>
  );
};

export default Cart;
