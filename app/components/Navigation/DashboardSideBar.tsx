"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaUserEdit } from "react-icons/fa";

const DashboardSideBar = () => {
  const [active, setActive] = useState("");
  const path = usePathname();
  useEffect(() => {
    if (path.endsWith("/dashboard")) {
      setActive("");
    }
    if (path.endsWith("/dashboard/user-edit")) {
      setActive("userEdit");
    }
  }, [path]);
  return (
    <aside>
      <ul className="menu bg-base-200 rounded-box w-fit text-2xl m-y-auto flex flex-col gap-1">
        <li>
          <Link
            href="/users/dashboard"
            className={classNames({ active: active === "" })}
          >
            <RxDashboard />
          </Link>
        </li>
        <li>
          <Link
            href="/users/dashboard/user-edit"
            className={classNames({ active: active === "userEdit" })}
          >
            <FaUserEdit />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default DashboardSideBar;
