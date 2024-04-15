/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ErrorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useEditUserProfileMutation } from "@/lib/features/api/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/app/components/utils/LoadingButton";
import classNames from "classnames";
import { useSelector } from "react-redux";
import OneFileUploader from "@/app/components/admin/OneFileUploader";

export default function UserEditForm() {
  const [editUser, { isLoading }] = useEditUserProfileMutation();
  const { user } = useSelector((state: any) => state?.user);
  const [image, setImage] = useState("");
  const schema: ZodSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    address: z.string().min(1),
    mobile: z.string().min(1),
    image: z.string().nullish(),
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
    setValue("image", user?.profile?.image);
  }, [user]);

  useEffect(() => {
    setValue("image", image);
  }, [image]);

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
      className=" w-full p-4 grid grid-col md:grid-col-2 lg:grid-col-4 lg:grid-row-2 gap-4 md:gap-3 lg:gap-2 lg:items-end"
      onSubmit={handleSubmit(userFormSubmit)}
    >
      <input {...register("image")} hidden />
      <input
        {...register("first_name")}
        type="text"
        placeholder="نام"
        className={classNames({
          "input input-bordered max-w-xs md:col-start-1 md:col-end-2 lg:col-start-1 lg:col-end-2":
            true,
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
          "input input-bordered  max-w-xs md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-3":
            true,
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
          "input input-bordered max-w-xs lg:col-start-3 lg:col-end-4": true,
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
          "input input-bordered max-w-xs  lg:col-start-4 lg:col-end-5": true,
          " border-2 border-error": errors.address,
        })}
      />
      {errors.address ? (
        <p className=" text-xs text-error -mt-3 lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3">
          آدرس را وارد کنید
        </p>
      ) : null}
      <OneFileUploader
        uploadedImageLink={image}
        uploadedImageLinkSetter={setImage}
      />
      <LoadingButton isLoading={isLoading} />
    </form>
  );
}
