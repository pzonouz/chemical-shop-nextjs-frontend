"use client";

import Link from "next/link";
import AdminMenu from "../components/admin/AdminMenu";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import errorToast from "../utils/ErrorToast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, status } = useSelector((state) => (state as any)?.user);
  const dispatch = useAppDispatch();

  if (!user?.is_staff) {
    return (
      <div className="p-8">
        <div>شما مجاز به ورود نیستید</div>
        {status == "Authenticated" ? (
          <a
            className=" btn btn-primary"
            onClick={() => {
              dispatch(setLoading());
              fetch(`/api/auth/logout`, {
                cache: "no-store",
              })
                .then((res) => {
                  if (res.ok) {
                    window.location.href = `/authentication/login`;
                  } else {
                    throw new Error(res.statusText);
                  }
                })
                .catch((err) => {
                  errorToast(err.message);
                  dispatch(unsetLoading());
                });
            }}
          >
            خروج
          </a>
        ) : (
          <Link href={"/authentication/login"} className=" btn btn-primary">
            ورود
          </Link>
        )}
      </div>
    );
  }

  return (
    <main className="mt-6 px-2 flex flex-row gap-3">
      <AdminMenu />
      {children}
    </main>
  );
}
