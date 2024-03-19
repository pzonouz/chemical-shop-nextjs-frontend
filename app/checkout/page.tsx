/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateOrderMutation,
  useEditUserMutation,
  useFetchUserQuery,
} from "@/lib/features/api/api";
import { useRouter } from "next/navigation";
import errorToast from "../utils/ErrorToast";
import Price from "../components/data/Price";
import successToast from "../utils/SuccessToast";
import LoadingButton from "../components/utils/LoadingButton";
import classNames from "classnames";

export default function CheckoutPage() {
  const { data: user, error } = useFetchUserQuery();
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingOrder, setLoadingOrder] = useState(false);
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const router = useRouter();
  const [editUser] = useEditUserMutation();
  const [createOrder] = useCreateOrderMutation();
  const onSubmit = (data: any) => {
    setLoadingOrder(true);
    createOrder(data)
      .unwrap()
      .then(() => {
        setLoadingOrder(false);
        successToast();
      })
      .catch((err) => {
        setLoadingOrder(false);
        errorToast(err.status);
      });
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (error != undefined && "status" in error && error.status == 401) {
      router.push("/authentication/login");
    }
  }, [error, router]);
  useEffect(() => {
    setAddress(user?.address!);
    setFirstName(user?.first_name!);
    setLastName(user?.last_name!);
    setMobile(user?.mobile!);
  }, [user]);

  return (
    <>
      <form
        className=" bg-base-200 p-3 mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" mx-2 flex py-2 px-4 flex-row gap-4 bg-white rounded-lg text-primary ">
          <p>زمان تامین کالا:</p>
          <p>حداکثر ۶روز کاری</p>
        </div>
        <div
          className={classNames({
            "mx-2 flex p-2 flex-col gap-1 bg-white rounded-lg text-slate-800":
              true,
            " border-2 border-error": errors.delivery_method,
          })}
        >
          <div className=" border-b-2 py-1">انتخاب شیوه ارسال:</div>
          <div className="form-control flex flex-row justify-start">
            <label className="label cursor-pointer">
              <input
                type="radio"
                className="radio checked:bg-primary"
                value={"P"}
                {...register("delivery_method", { required: true })}
              />
              <span className="label-text mx-2">پست</span>
            </label>
          </div>
          <div className="form-control flex flex-row justify-start">
            <label className="label cursor-pointer">
              <input
                type="radio"
                className="radio checked:bg-primary"
                {...register("delivery_method", { required: true })}
                value={"I"}
              />
              <span className="label-text mx-2"> مراجعه حضوری</span>
            </label>
          </div>
          {errors.delivery_method ? (
            <p className=" text-error text-xs">
              یکی از موارد بالا را انتخاب کنید
            </p>
          ) : null}
        </div>
        <div className=" mx-2 flex px-4 py-2 flex-col gap-4 bg-white rounded-lg text-slate-800">
          <div className="border-b-2 py-1 flex items-center justify-between px-2">
            <div>آدرس ارسال</div>
            <div
              className=" text-xs flex gap-1 text-error cursor-pointer"
              onClick={() =>
                editStatus ? setEditStatus(false) : setEditStatus(true)
              }
            >
              <p>ویرایش</p>
            </div>
          </div>
          {editStatus ? (
            <div className=" flex flex-col gap-1">
              <textarea
                placeholder="آدرس"
                className=" w-full appearance-none outline-none border-2 border-base-200 rounded-lg p-2 "
                value={address}
                onChange={(e) => {
                  setAddress(e.currentTarget.value);
                }}
              ></textarea>
              <input
                placeholder="نام"
                className=" w-full appearance-none outline-none border-2 border-base-200 rounded-lg p-2 "
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
              ></input>
              <input
                placeholder="نام خانوادگی"
                className=" w-full appearance-none outline-none border-2 border-base-200 rounded-lg p-2 "
                value={lastName}
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
              ></input>
              <input
                placeholder="موبایل"
                className=" w-full appearance-none outline-none border-2 border-base-200 rounded-lg p-2 "
                value={mobile}
                onChange={(e) => {
                  setMobile(e.currentTarget.value);
                }}
              ></input>

              <a
                className="btn btn-primary w-full"
                onClick={() => {
                  setLoadingUser(true);
                  editUser({
                    ...user,
                    first_name: firstName,
                    last_name: lastName,
                    mobile: mobile,
                    address: address,
                  })
                    .unwrap()
                    .then(() => {
                      setLoadingUser(false);
                      successToast();
                      setEditStatus(false);
                    })
                    .catch((err) => {
                      setLoadingUser(false);
                      errorToast(err.status);
                    });
                }}
              >
                {isLoadingUser ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>ثبت</>
                )}
              </a>
            </div>
          ) : (
            <div>
              {user?.address} {user?.first_name} {user?.last_name}
              {user?.mobile}
            </div>
          )}
        </div>
        <div className="mx-2 flex px-4 py-2 flex-col gap-4 bg-white rounded-lg text-slate-800">
          <div className=" flex justify-between">
            <>قیمت کل کالاها:</>
            <div className=" flex gap-1">
              <Price />
              <div>تومان</div>
            </div>
          </div>
          <div className=" flex justify-between">
            <div>مبلغ قابل پرداخت:</div>
            <div className=" flex gap-1">
              <Price />
              <div>تومان</div>
            </div>
          </div>
        </div>
        <LoadingButton
          type="success"
          isLoading={isLoadingOrder}
          text="پرداخت"
          className={`text-white`}
        />
        {/* <button type="submit" className=" btn btn-success text-white">
          پرداخت
        </button> */}
      </form>
    </>
  );
}
