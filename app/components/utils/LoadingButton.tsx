import React from "react";

const LoadingButton = ({
  isLoading,
  type = "primary",
  className = "",
}: {
  isLoading: boolean;
  type?: string;
  className?: string;
}) => {
  return (
    <>
      {isLoading ? (
        <button className={`btn btn-${type} ${className}`}>
          <span className=" loading loading-spinner"></span>
        </button>
      ) : (
        <button className={`btn btn-${type} ${className}`}>ثبت</button>
      )}
    </>
  );
};

export default LoadingButton;
