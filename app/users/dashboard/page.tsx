"use client";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import { useAppDispatch } from "@/lib/hooks";
import moment from "jalali-moment";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user, status } = useSelector((state: any) => state?.user);
  return (
    <div className=" p-4 bg-base-200 rounded-xl w-full">
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
          <p>
            {ToPersianDigit(
              moment(user?.created_at).locale("fa").format("YYYY/MM/DD")
            )}
          </p>
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
