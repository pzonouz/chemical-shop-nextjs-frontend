"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-base-300 z-40 opacity-80">
      <div className="fixed top-1/2 right-1/2 text-error w-fit z-50 translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center ">
        <h1>خطای ارتباط با سرور</h1>
        <button
          className=" btn btn-primary"
          onClick={() => window.location.reload()}
        >
          دوباره تلاش کنید
        </button>
      </div>
    </div>
  );
}
