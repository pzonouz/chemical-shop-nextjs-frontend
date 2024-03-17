"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import {
  useFetchCartItemsQuery,
  useFetchUserQuery,
} from "@/lib/features/api/api";
import { useEffect } from "react";
import errorToast from "@/app/utils/ErrorToast";
import Cart from "../data/Cart";
import { usePathname, useRouter } from "next/navigation";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";

const Navbar = () => {
  const { data: user } = useFetchUserQuery();
  const path = usePathname();
  const { data: cartItems, isError, error } = useFetchCartItemsQuery();
  const router = useRouter();
  useEffect(() => {
    errorToast(error);
  }, [error]);
  useEffect(() => {
    if (user && path.endsWith("authentication/login")) {
      router.push("/");
    }
  }, [user, path, router]);
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
                {cartItems?.length ? (
                  <span className="badge badge-sm indicator-item bg-secondary text-white font-bold">
                    {cartItems?.length}
                  </span>
                ) : null}
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content bg-base-100 shadow w-80"
            >
              <div className="card-body w-full">
                {cartItems?.length ? (
                  <Cart />
                ) : (
                  <div className=" text-error"> سبد خرید شما خالی است</div>
                )}
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
                  <li
                    onClick={() => {
                      setLoading();
                      fetch("http://localhost/api/auth/logout")
                        .then((res) => {
                          if (res.ok) {
                            window.location.href =
                              "http://localhost:/authentication/login";
                          }
                          unsetLoading();
                        })
                        .catch();
                    }}
                  >
                    <a>خروج</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={"/authentication/register"}>ثبت نام</Link>
                  </li>
                  <li>
                    <Link href={"/authentication/login"}>ورود</Link>
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
