"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import {
  useDeleteCartMutation,
  useEditCartMutation,
} from "@/lib/features/api/api";
import successToast from "@/app/utils/SuccessToast";
import errorToast from "@/app/utils/ErrorToast";
import { Cart } from "@/app/types";

const CartItem = (props) => {
  const [count, setCount] = useState(parseInt(props.cart?.quantity));
  const [editActive, setEditActive] = useState(false);
  const [cart, setCart] = useState<Cart>(props.cart);
  const [editCart] = useEditCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  useEffect(() => {
    setCart(props.cart);
    setCount(props.cart.quantity);
  }, [props.cart]);

  return (
    <div className=" flex">
      <div className="grid grid-cols-2 w-full items-center justify-items-start gap-2 p-4 rounded-r-xl border-r-2 border-t-2 border-b-2 border-base-300 ">
        <div className=" col-start-1 col-end-2">{cart?.product?.name}</div>
        <div className=" col-start-2 col-end-3 justify-self-end">
          {cart?.product?.english_name}
        </div>
        {editActive ? (
          <>
            <ul className="flex text-lg leading-3 rounded-md  col-start-1 col-end-2">
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
            <a
              className=" btn btn-primary"
              onClick={() => {
                editCart({
                  id: cart.id,
                  product_id: cart.product.id,
                  quantity: count,
                })
                  .then((res: any) => {
                    if (res?.error) {
                      return errorToast(res.error.status);
                    }
                    // successToast();
                    setEditActive(false);
                  })
                  .catch((err) => errorToast(JSON.stringify(err)));
              }}
            >
              ذخیره
            </a>
          </>
        ) : (
          <div>تعداد: {cart?.quantity}</div>
        )}
        <div className="col-start-2 col-end-3 row-start-2  justify-self-end ">
          {textToThousandSeparated(count * textToNumber(cart?.product?.price))}
          تومان
        </div>
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-3 w-12 text-2xl flex flex-col">
        <div
          onClick={() => {
            (document.getElementById("my_modal_5") as any)?.showModal();
          }}
          className="flex flex-1 items-center justify-center bg-error text-white cursor-pointer rounded-tl-xl"
        >
          <MdOutlineDelete />
        </div>
        <div
          onClick={() => {
            setEditActive(true);
          }}
          className="flex flex-1 items-center justify-center bg-primary text-white cursor-pointer rounded-bl-xl"
        >
          <MdOutlineEdit />
        </div>
      </div>
      {/* delete Confirm window */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
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
                  deleteCart(cart?.id)
                    .then((res) => successToast())
                    .catch((err) => errorToast(err));
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

export default CartItem;
