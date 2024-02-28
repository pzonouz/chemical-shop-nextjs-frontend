"use client";
import { GoPackage } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { MdBorderColor } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
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
    }
  }, [path]);

  return (
    <ul className="menu bg-base-200 rounded-box w-fit text-2xl p-2 gap-2 flex flex-col my-auto">
      <li>
        <Link
          href={"/admin/"}
          className={classNames({ active: active === "Home" })}
          onClick={() => {
            setActive("Home");
          }}
        >
          <IoHomeOutline />
        </Link>
      </li>
      <li>
        <Link
          href={"/admin/products"}
          className={classNames({ active: active === "Products" })}
          onClick={() => {
            setActive("Products");
          }}
        >
          <GoPackage />
        </Link>
      </li>
      <li>
        <Link
          href={"/admin/users"}
          className={classNames({ active: active === "Users" })}
          onClick={() => {
            setActive("Users");
          }}
        >
          <FiUsers />
        </Link>
      </li>
      <li>
        <a>
          <MdBorderColor />
        </a>
      </li>
    </ul>
  );
};

export default AdminMenu;
