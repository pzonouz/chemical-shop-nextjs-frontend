import AddToCartButtonWithCount from "@/app/components/data/AddtoCartButtonWithCount";
import { Product } from "@/app/types";
import classNames from "classnames";
import { useState } from "react";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost/api/products/${id}`, {
        next: { revalidate: 60 },
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return resData;
    } catch (e) {}
  };
  const product: Product = await fetchProduct(id);
  return (
    <div className="mt-12 mx-2 bg-base-200 p-4 grid grid-cols-1 gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className=" rounded-tl-lg rounded-tr-lg"
      />
      <div className=" px-2 flex flex-col gap-2">
        <div className=" flex flex-row items-center justify-between">
          <div className=" text-xl font-bold">{product.name}</div>
          <div className=" text-md">EnglishName</div>
        </div>

        <AddToCartButtonWithCount product={product} />
      </div>
    </div>
  );
}
