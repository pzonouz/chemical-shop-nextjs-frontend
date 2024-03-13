"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { useFetchUserQuery } from "@/lib/features/api/api";
import { useEffect } from "react";

const Navbar = () => {
  const { data: user } = useFetchUserQuery();
  useEffect(() => {}, [user]);
  return (
    <div>
      <div className="bg-base-100 navbar">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FaBars className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
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
                  src={user ? user?.image! : "/images/Sample_User_Icon.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28 flex flex-col gap-3"
            >
              {user ? (
                <>
                  <li>
                    <Link href={`/users/dashboard`}>پنل کاربری</Link>
                  </li>
                  <li>
                    <Link href={"auth/signout"}>خروج</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={"auth/register"}>ثبت نام</Link>
                  </li>
                  <li>
                    <Link href={"auth/login"}>ورود</Link>
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
