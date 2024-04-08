/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ErrorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useEditUserProfileMutation } from "@/lib/features/api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/app/components/utils/LoadingButton";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function UserEditForm() {
  const [editUser, { isLoading }] = useEditUserProfileMutation();
  const { user, status } = useSelector((state: any) => state?.user);
  const schema: ZodSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    address: z.string().min(1),
    mobile: z.string().min(1),
  });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    setValue("first_name", user?.profile?.first_name);
    setValue("last_name", user?.profile?.last_name);
    setValue("address", user?.profile?.address);
    setValue("mobile", user?.profile?.mobile);
  }, [user]);

  const userFormSubmit = (data: any) => {
    editUser({ id: user?.profile?.id, ...data })
      .then((res: any) => {
        if (res.error) {
          throw new Error(res.error.originalStatus);
        }
        successToast();
      })
      .catch((error) => {
        ErrorToast(error.message);
      });
  };
  return (
    <form
      className=" w-full p-4 flex flex-col gap-4"
      onSubmit={handleSubmit(userFormSubmit)}
    >
      <input
        {...register("first_name")}
        type="text"
        placeholder="نام"
        className={classNames({
          "input input-bordered w-full max-w-xs": true,
          " border-2 border-error": errors.first_name,
        })}
      />
      {errors.first_name ? (
        <p className=" text-xs text-error -mt-3">نام را وارد کنید</p>
      ) : null}

      <input
        {...register("last_name")}
        type="text"
        placeholder="نام خانوادگی"
        className={classNames({
          "input input-bordered w-full max-w-xs": true,
          " border-2 border-error": errors.last_name,
        })}
      />
      {errors.last_name ? (
        <p className=" text-xs text-error -mt-3">نام خانوادگی را وارد کنید</p>
      ) : null}

      <input
        {...register("mobile")}
        type="text"
        placeholder="موبایل"
        className={classNames({
          "input input-bordered w-full max-w-xs": true,
          " border-2 border-error": errors.mobile,
        })}
      />
      {errors.mobile ? (
        <p className=" text-xs text-error -mt-3">موبایل را وارد کنید</p>
      ) : null}

      <input
        {...register("address")}
        type="text"
        placeholder="آدرس"
        className={classNames({
          "input input-bordered w-full max-w-xs": true,
          " border-2 border-error": errors.address,
        })}
      />
      {errors.address ? (
        <p className=" text-xs text-error -mt-3">آدرس را وارد کنید</p>
      ) : null}
      <LoadingButton isLoading={isLoading} />
    </form>
  );
}
