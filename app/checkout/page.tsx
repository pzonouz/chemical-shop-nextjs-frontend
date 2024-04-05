/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateOrderMutation,
  useEditUserProfileMutation,
  useFetchUserQuery,
} from "@/lib/features/api/api";
import { useRouter } from "next/navigation";
import errorToast from "../utils/ErrorToast";
import Price from "../components/data/Price";
import successToast from "../utils/SuccessToast";
import LoadingButton from "../components/utils/LoadingButton";
import classNames from "classnames";
import Link from "next/link";

export default function CheckoutPage() {
  const { data: user, error } = useFetchUserQuery();
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isLoadingOrder, setLoadingOrder] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const router = useRouter();
  const [editUser] = useEditUserProfileMutation();
  const [createOrder] = useCreateOrderMutation();
  const onSubmit = (data: any) => {
    if (
      user?.profile?.address == null ||
      user?.profile?.first_name == null ||
      user?.profile?.last_name == null ||
      user?.profile?.mobile == null
    ) {
      errorToast("اطلاعات شخصی را به صورت کامل پر کنید");
      setTimeout(() => {}, 3000);
      router.push("/users/dashboard/user-edit");
      return;
    }
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
  useEffect(() => {}, [user]);

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
        <div
          className={classNames({
            "mx-2 flex px-4 py-2 flex-col gap-4 bg-white rounded-lg text-slate-800":
              true,
            " border-2 border-error": addressError,
          })}
        >
          <div className="border-b-2 py-1 flex items-center justify-between px-2">
            <div>آدرس ارسال</div>
            <Link
              className=" text-xs text-error"
              href={"/users/dashboard/user-edit"}
            >
              ویرایش
            </Link>
          </div>
          <div>
            {user?.profile?.address} {user?.profile?.first_name}{" "}
            {user?.profile?.last_name}
            {user?.profile?.mobile}
          </div>
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
          totalPriceButton={true}
          type="success"
          isLoading={isLoadingOrder}
          text="پرداخت"
          className={`text-white`}
        />
      </form>
    </>
  );
}
