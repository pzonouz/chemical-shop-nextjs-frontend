"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { createSelector } from "reselect";

const Loading = () => {
  const loadingSelector = createSelector(
    (state) => state.loading,
    (loading) => loading.status
  );
  const loading = useAppSelector(loadingSelector);
  useEffect(() => {
    console.log("loading:", loading);
  }, [loading]);
  return (
    loading && (
      <div className="fixed top-0 right-0 w-screen h-screen bg-base-300 z-40 opacity-80">
        <div className="loading loading-spinner fixed top-1/2 right-1/2 text-primary w-16 h-16 z-50 translate-x-1/2 -translate-y-1/2"></div>
      </div>
    )
  );
};

export default Loading;
