"use client";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import classNames from "classnames";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Favorite = ({ product }: { product: Product }) => {
  const [active, setActive] = useState(product?.favorites.length!);
  return (
    <div
      onClick={() => {
        fetch("/api/favorites/", {
          method: "POST",
          body: JSON.stringify({ product: product.id }),
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            if (res.ok) {
              if (res.status == 201) {
                setActive(1);
              }
              if (res.status == 204) {
                setActive(0);
              }
            } else {
              throw new Error(res.statusText);
            }
          })
          .catch((err: any) => {
            errorToast(err.message);
          });
      }}
      className={classNames({
        "absolute flex items-center justify-center p-2 text-center  rounded-full shadow-xl cursor-pointer right-3 bottom-3 bg-gray-200  w-11 h-11":
          true,
        "text-gray-500 hover:text-gray-800": !active,
        " text-error hover:text-red-800": active,
      })}
    >
      <FaHeart />
    </div>
  );
};

export default Favorite;
