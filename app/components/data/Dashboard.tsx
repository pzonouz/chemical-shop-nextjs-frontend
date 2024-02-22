"use client";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEditLocation } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { RiHistoryFill } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { PiWechatLogo } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import InputBox from "./InputBox";

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="mt-12 p-2 flex flex-row gap-2 ">
      <aside className="">
        <ul className="menu bg-base-200 rounded-box w-fit text-2xl m-y-auto">
          <li className="">
            <a
              onClick={() => {
                setActive("dashboard");
              }}
              key={"dashboard"}
              className={classNames({ active: active === "dashboard" })}
            >
              <RxDashboard />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("account");
              }}
              key={"account"}
              className={classNames({ active: active === "account" })}
            >
              <FaRegUser />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("address");
              }}
              key={"address"}
              className={classNames({ active: active === "address" })}
            >
              <MdOutlineEditLocation />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("wallet");
              }}
              key={"wallet"}
              className={classNames({ active: active === "wallet" })}
            >
              <LuWallet />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("orders");
              }}
              key={"orders"}
              className={classNames({ active: active === "orders" })}
            >
              <RiHistoryFill />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("cart");
              }}
              key={"cart"}
              className={classNames({ active: active === "cart" })}
            >
              <LuShoppingCart />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("favorites");
              }}
              key={"favorites"}
              className={classNames({ active: active === "favorites" })}
            >
              <MdFavoriteBorder />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActive("tickets");
              }}
              key={"tickets"}
              className={classNames({ active: active === "tickets" })}
            >
              <PiWechatLogo />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                router.push("/api/auth/signout");
              }}
            >
              <VscSignOut />
            </a>
          </li>
        </ul>
      </aside>
      <main
        className={classNames({
          "bg-base-200 w-full rounded-2xl p-4": true,
          " hidden": active !== "dashboard",
        })}
      >
        <div className=" flex flex-row text-sm items-center justify-between">
          <p>اطلاعات حساب کاربری</p>
          <p className=" flex items-center text-xs text-error cursor-pointer">
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
              چهار راه طالقانی به سمت بیمارستان ارتش.نرسیده به قنادی پاپا. طبقه
              بالای گلفروشی لیلیوم. آموزشگاه جاویدان صنعت. آقای محمد نژاد
            </p>
          </div>
        </div>
      </main>
      <main
        className={classNames({
          "bg-base-200 w-full rounded-2xl": true,
          " hidden": active !== "account",
        })}
      >
        <form
          className=" w-full p-4 flex flex-col gap-4"
          onSubmit={() => {
            handleSubmit(onSubmit);
          }}
        >
          <InputBox
            name="firstName"
            errors={errors}
            registerFn={register}
            type="text"
            text="نام"
          />
          <InputBox
            name="lastName"
            errors={errors}
            registerFn={register}
            type="text"
            text="نام خانوادگی"
          />
          <InputBox
            name="mobilePhone"
            errors={errors}
            registerFn={register}
            type="text"
            text="موبایل"
          />
          <button className=" btn btn-primary">ثبت</button>
        </form>
      </main>{" "}
      <main
        className={classNames({
          "bg-base-200 w-full rounded-2xl p-4": true,
          " hidden": active !== "address",
        })}
      >
        <div className=" flex items-center justify-between border-b-[2px] py-2">
          <p>آدرس های من</p>
          <p
            className="text-xs text-error cursor-pointer"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            + ثبت آدرس جدید
          </p>
        </div>

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form className="flex flex-col p-4 gap-4">
              <textarea
                className="textarea textarea-bordered"
                placeholder="آدرس جدید را وارد کنید"
              ></textarea>
              <button className=" btn btn-primary">ثبت</button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className=" p-2 align-center flex flex-col">
          <p>
            چهار راه طالقانی به سمت بیمارستان ارتش.نرسیده به قنادی پاپا. طبقه
            بالای گلفروشی لیلیوم. آموزشگاه جاویدان صنعت. آقای محمد نژاد
          </p>
          <div className=" self-end text-xl flex items-center gap-2">
            <MdEdit className=" text-info cursor-pointer" />
            <AiFillDelete
              className="text-error cursor-pointer"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            />
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col gap-4">
              <div>پاک شود؟</div>
              <button className="btn btn-error">بله</button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        {/* <form
          className=" w-full p-4 flex flex-col gap-4"
          onSubmit={() => {
            handleSubmit(onSubmit);
          }}
        >
          <InputBox
            name="firstName"
            errors={errors}
            registerFn={register}
            type="text"
            text="نام"
          />
          <InputBox
            name="lastName"
            errors={errors}
            registerFn={register}
            type="text"
            text="نام خانوادگی"
          />
          <InputBox
            name="mobilePhone"
            errors={errors}
            registerFn={register}
            type="text"
            text="موبایل"
          />
          <button className=" btn btn-primary">ثبت</button>
        </form> */}
      </main>
    </div>
  );
};

export default Dashboard;
