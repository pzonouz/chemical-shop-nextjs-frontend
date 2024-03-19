import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const LoadingButton = ({
  isLoading,
  type = "primary",
  className = "",
  text = "ثبت",
}: {
  isLoading: boolean;
  type?: string;
  className?: string;
  text: string;
}) => {
  const totalPriceZeroError = useAppSelector(
    (state) => state.totalPriceZeroError
  );
  useEffect(() => {
    console.log(totalPriceZeroError);
  }, [totalPriceZeroError]);
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
            totalPriceZeroError.status ? "btn-disabled" : null
          } ${className}`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default LoadingButton;
