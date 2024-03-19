/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchCartItemsQuery } from "@/lib/features/api/api";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import { useAppDispatch } from "@/lib/hooks";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import {
  setTotalPriceZeroError,
  unsetTotalPriceZeroError,
} from "@/lib/features/utils/totalPrice";

const Price = () => {
  const { data: carts, error, isError } = useFetchCartItemsQuery();
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let t = 0;
    setTotal((total) => {
      carts?.map((cart: Cart) => {
        t += parseInt(cart.quantity) * textToNumber(cart?.product?.price!);
      });
      total = t;
      if (total == 0) {
        dispatch(setTotalPriceZeroError());
      } else {
        dispatch(unsetTotalPriceZeroError());
      }
      return total;
    });
  }, [carts]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return <p>{ToPersianDigit(textToThousandSeparated(total) as string)}</p>;
};

export default Price;
