"use client";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEditLocation } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { RiHistoryFill } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { PiWechatLogo } from "react-icons/pi";
import { VscSignOut } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { ReactNode, useState } from "react";

import DashboardMainItem from "./DashboardMainItem";
import UserInfoEditForm from "./UserInfoEditForm";
import AddressEditForm from "./AddressEditForm";
import Address from "./Address";
import DashboardSideBar from "../Navigation/DashboardSideBar";
import { getSession, useSession } from "next-auth/react";

export interface DashboardItem {
  icon: ReactNode;
  text: string;
  innerHTML: JSX.Element | undefined;
}
const Dashboard = () => {
  const items: DashboardItem[] = [
    {
      icon: <RxDashboard />,
      text: "dashboard",
      innerHTML: (
        <>
          <div className=" flex flex-row text-sm items-center justify-between">
            <p>اطلاعات حساب کاربری</p>
            <p
              className=" flex items-center text-xs text-error cursor-pointer"
              onClick={() => setActive("account")}
            >
              ویرایش
              <FaRegEdit />
            </p>
          </div>
          <div className=" flex flex-col gap-1 mt-3">
            <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
              <p>نام:</p>
              <p>پیمان</p>
            </div>
            <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
              <p>نام خانوادگی:</p>
              <p>خلیلی زنوز</p>
            </div>
            <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
              <p>ایمیل:</p>
              <p>خلیلی زنوز</p>
            </div>{" "}
            <div className=" flex flex-row gap-2 border-b-2 border-base-content p-1 items-center justify-between">
              <p>تاریخ عضویت:</p>
              <p>خلیلی زنوز</p>
            </div>{" "}
            <div className=" flex flex-row gap-2 p-1 items-center justify-between">
              <p>آدرس:</p>
              <p className=" text-sm">
                چهار راه طالقانی به سمت بیمارستان ارتش.نرسیده به قنادی پاپا.
                طبقه بالای گلفروشی لیلیوم. آموزشگاه جاویدان صنعت. آقای محمد نژاد
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      icon: <FaRegUser />,
      text: "account",
      innerHTML: <UserInfoEditForm />,
    },
    {
      icon: <MdOutlineEditLocation />,
      text: "address",
      innerHTML: (
        <>
          <div className=" flex items-center justify-between border-b-[2px] py-2">
            <p>آدرس های من</p>
            <p
              className="text-xs text-error cursor-pointer"
              onClick={() =>
                (
                  document.getElementById("my_modal_2") as HTMLFormElement
                ).showModal()
              }
            >
              + ثبت آدرس جدید
            </p>
          </div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <AddressEditForm data={null} />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <Address />
        </>
      ),
    },
    { icon: <LuWallet />, text: "wallet", innerHTML: undefined },
    { icon: <RiHistoryFill />, text: "orders", innerHTML: undefined },
    ,
    { icon: <LuShoppingCart />, text: "cart", innerHTML: undefined },
    ,
    { icon: <MdFavoriteBorder />, text: "favorites", innerHTML: undefined },
    ,
    { icon: <PiWechatLogo />, text: "tickets", innerHTML: undefined },
    ,
    { icon: <VscSignOut />, text: "signOut", innerHTML: undefined },
  ] as DashboardItem[];
  const [active, setActive] = useState("dashboard");
  return (
    <div className="mt-12 p-2 flex flex-row gap-2 ">
      <DashboardSideBar state={active} setState={setActive} items={items} />
      {items?.map(({ text, innerHTML }) => {
        return (
          <DashboardMainItem
            key={text}
            state={active}
            text={text}
            innerHTML={innerHTML}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
