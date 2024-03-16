"use client";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useAddToCartMutation } from "@/lib/features/api/api";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  return (
    <p
      className=" btn btn-primary"
      onClick={() => {
        addToCart({ product_id: product.id, quantity: 1 })
          .then((res) => {
            if (res.error) {
              if (res?.error?.status == 401) {
                return router.push("/authentication/login/");
              } else {
                throw new Error(res.error.originalStatus);
              }
            }
            successToast();
          })
          .catch((err) => errorToast(err?.message));
      }}
    >
      افزودن به سبد
    </p>
  );
};

export default AddToCartButton;
