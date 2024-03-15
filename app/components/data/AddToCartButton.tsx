"use client";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import {
  useAddToCartMutation,
  useFetchUserQuery,
} from "@/lib/features/api/api";
import { useEffect } from "react";

const AddToCartButton = ({ product }: { product: Product }) => {
  const [addToCart] = useAddToCartMutation();
  const { data: user, error } = useFetchUserQuery();
  useEffect(() => {
    errorToast(error);
  }, [error]);
  return (
    <p
      className=" btn btn-primary"
      onClick={() => {
        addToCart({ user: user.id, product: product.id, quantity: 1 })
          .then((res) => successToast())
          .catch((err) => errorToast(err?.status));
      }}
    >
      افزودن به سبد
    </p>
  );
};

export default AddToCartButton;
