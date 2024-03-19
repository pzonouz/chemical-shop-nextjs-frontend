/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/app/types";
import { useFetchCartItemsQuery } from "@/lib/features/api/api";
import CartItem from "./CartItem";

import Link from "next/link";
import Price from "./Price";

const Cart = () => {
  const { data: carts, error, isError } = useFetchCartItemsQuery();
  return (
    <div>
      <div className=" flex gap-1 items-center justify-center text-success mt-2 w-fit">
        <p>مجموع:</p>
        <Price />
        <p>تومان</p>
      </div>
      <div className=" flex flex-col gap-2">
        {carts?.map((cart: Cart) => {
          return <CartItem key={cart.id} cart={cart} />;
        })}
      </div>
      <Link
        href="/checkout"
        className=" btn btn-success text-white mt-4"
        onClick={(e) => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        نهایی کردن خرید
      </Link>
    </div>
  );
};

export default Cart;
