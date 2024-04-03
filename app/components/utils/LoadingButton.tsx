import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const LoadingButton = ({
  isLoading,
  type = "primary",
  className = "",
  text = "ثبت",
  totalPriceButton = false,
}: {
  isLoading: boolean;
  type?: string;
  className?: string;
  text?: string;
  totalPriceButton?: boolean;
}) => {
  const totalPriceZeroError = useAppSelector(
    (state) => state.totalPriceZeroError
  );
  useEffect(() => {}, [totalPriceZeroError]);
  return (
    <>
      {isLoading ? (
        <button
          className={`btn btn-${type} ${
            totalPriceZeroError.status ? "btn-disabled" : null
          } ${className}`}
        >
          <span className=" loading loading-spinner"></span>
        </button>
      ) : (
        <button
          className={`btn btn-${type} ${
            totalPriceZeroError.status && totalPriceButton
              ? "btn-disabled"
              : null
          } ${className}`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default LoadingButton;
