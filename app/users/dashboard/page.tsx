"use client";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import moment from "jalali-moment";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useSelector((state: any) => state?.user);
  return (
    <div className=" p-4 bg-base-200 rounded-xl w-full flex flex-col justify-center">
      <div className=" flex flex-row text-sm items-center justify-between">
        <p className=" font-bold">اطلاعات حساب کاربری</p>
        <Link
          href="/users/dashboard/user-edit"
          className=" flex items-center text-xs text-error cursor-pointer self-start"
        >
          ویرایش
          <FaRegEdit />
        </Link>
      </div>
      <div className=" grid grid-col-1 sm:grid-col-2 gap-1 sm:gap-3 md:grid-col-3 lg:grid-col-6 mt-3">
        <div className="sm:col-start-1 sm:col-end-2 flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>نام:</p>
          <p>{user?.profile?.first_name}</p>
        </div>
        <div className="sm:col-start-2 sm:col-end-3 flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>نام خانوادگی:</p>
          <p> {user?.profile?.last_name}</p>
        </div>
        <div className="md:col-start-3 md:col-end-4 flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>ایمیل:</p>
          <p> {user?.email}</p>
        </div>{" "}
        <div className="lg:col-start-4 lg:col-end-5 flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p>موبایل :</p>
          <p> {ToPersianDigit(user?.profile?.mobile)}</p>
        </div>
        <div className="lg:col-start-5 lg:col-end-6 flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
          <p> تاریخ عضویت:</p>
          <p>
            {ToPersianDigit(
              moment(user?.created_at).locale("fa").format("YYYY/MM/DD"),
            )}
          </p>
        </div>
        <div className="lg:col-start-6 lg:col-end-7 flex flex-row gap-2 sm:border-b-2 border-base-content  p-1 items-center justify-between">
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
