"use client";
import { GoPackage } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const [active, setActive] = useState("");
  const path = usePathname();
  useEffect(() => {
    switch (path) {
      case "/admin":
        setActive("Home");
        break;
      case "/admin/products":
        setActive("Products");
        break;
      case "/admin/categories":
        setActive("Categories");
        break;
      case "/admin/users":
        setActive("Users");
        break;
      case "/admin/orders":
        setActive("Orders");
        break;
    }
  }, [path]);

  return (
    <ul className="menu bg-base-200 rounded-box w-fit text-2xl p-2 gap-2 flex flex-col my-auto">
      <li
        onClick={() => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        <Link
          href={"/admin/"}
          className={classNames({
            active: active === "Home",
            "p-3 flex items-center justify-center": true,
          })}
          onClick={() => {
            setActive("Home");
          }}
        >
          <IoHomeOutline />
        </Link>
      </li>
      <li
        onClick={() => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        <Link
          href={"/admin/products"}
          className={classNames({
            active: active === "Products",
            "p-3 flex items-center justify-center": true,
          })}
          onClick={() => {
            setActive("Products");
          }}
        >
          <GoPackage />
        </Link>
      </li>
      <li
        onClick={() => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        <Link
          href={"/admin/categories"}
          className={classNames({
            active: active === "Categories",
            "p-3 flex items-center justify-center": true,
          })}
          onClick={() => {
            setActive("Categories");
          }}
        >
          <MdOutlineCategory />
        </Link>
      </li>
      <li
        onClick={() => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        <Link
          href={"/admin/users"}
          className={classNames({
            active: active === "Users",
            "p-3 flex items-center justify-center": true,
          })}
          onClick={() => {
            setActive("Users");
          }}
        >
          <FiUsers />
        </Link>
      </li>
      <li
        onClick={() => {
          const elm = document.activeElement as HTMLElement;
          if (elm) {
            elm?.blur();
          }
        }}
      >
        <Link
          href={"/admin/orders"}
          className={classNames({
            active: active === "Orders",
            "p-3 flex items-center justify-center": true,
          })}
          onClick={() => {
            setActive("Orders");
          }}
        >
          <LuPackageOpen />
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
