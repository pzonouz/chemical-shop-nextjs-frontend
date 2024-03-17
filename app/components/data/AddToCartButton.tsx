"use client";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useAddToCartMutation } from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddToCartButton = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();

  return (
    <p
      className=" btn btn-primary"
      onClick={() => {
        dispatch(setLoading());
        addToCart({ product_id: product.id, quantity: 1 })
          .unwrap()
          .then(() => {
            dispatch(unsetLoading());
            successToast();
          })
          .catch((err) => {
            if (err?.status == 401) {
              dispatch(unsetLoading());
              errorToast("باید ابتدا وارد شوید");
              router.push("/authentication/login/");
            }
          });
      }}
    >
      افزودن به سبد
    </p>
  );
};

export default AddToCartButton;
