"use client";
import { useFetchUserQuery } from "@/lib/features/api/api";
import Link from "next/link";
import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { data: user, error, isFetching } = useFetchUserQuery();

  useEffect(() => {}, [isFetching]);
  useEffect(() => {
    toast.error((error as any)?.originalStatus);
  }, [error]);
  return (
    <div className=" p-4 bg-base-200 rounded-xl">
      <div className=" flex flex-row text-sm items-center justify-between">
        <p>اطلاعات حساب کاربری</p>
        <Link
          href="/users/dashboard/user-edit"
          className=" flex items-center text-xs text-error cursor-pointer"
        >
          ویرایش
          <FaRegEdit />
        </Link>
      </div>
      <div className=" flex flex-col gap-1 mt-3">
        <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>نام:</p>
          <p>{user?.profile?.first_name}</p>
        </div>
        <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>نام خانوادگی:</p>
          <p> {user?.profile?.last_name}</p>
        </div>
        <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>ایمیل:</p>
          <p> {user?.email}</p>
        </div>{" "}
        <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>موبایل :</p>
          <p> {user?.profile?.mobile}</p>
        </div>
        <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p> تاریخ عضویت:</p>
          <p> {user?.profile?.created_at?.toString()}</p>
        </div>
        <div className=" flex flex-row gap-2 p-1 items-center justify-between">
          <p>آدرس:</p>
          {user?.profile?.address && (
            <p className=" text-sm">{user?.profile?.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
