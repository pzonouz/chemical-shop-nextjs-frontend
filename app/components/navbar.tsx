"use client";

import Link from "next/link";
import React from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <div>
      <div className="bg-base-100 navbar">
        <label
          htmlFor="my-drawer-4"
          className="text-2xl hover:text-primary cursor-pointer flex-auto"
        >
          <IoMenuSharp />
        </label>
        <div className="flex-auto">
          <Link href="/" className="btn btn-ghost text-xl">
            نانو شاپ
          </Link>
        </div>
        <div className="flex-none">
          <div className="btn btn-ghost btn-circle">
            <BsSearch className=" text-2xl" />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <BsCart className="text-2xl" />
                <span className="badge badge-sm indicator-item bg-secondary text-white font-bold">
                  ۲
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">۲ مورد</span>
                <span className="text-info">مجموع: ۱.۲۰۰.۰۰۰ تومان</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    مشاهده سبد
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Sample user image"
                  src={
                    status == "authenticated"
                      ? session.user?.image!
                      : "/images/Sample_User_Icon.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28 flex flex-col gap-3"
            >
              {status == "authenticated" ? (
                <>
                  <li>
                    <Link href={"/auth"}>ناحیه کاربری</Link>
                  </li>
                  <li>
                    <Link href={"/api/auth/signout"}>خروج</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={"/"}>ثبت نام</Link>
                  </li>
                  <li>
                    <Link href={"/api/auth/signin"}>ورود</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
