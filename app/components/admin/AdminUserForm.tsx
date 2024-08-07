/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAdminEditUserProfileMutation } from "@/lib/features/api/api";
import LoadingButton from "../utils/LoadingButton";
import OneFileUploader from "./OneFileUploader";
import { User, UserProfile } from "@/app/types";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";

const AdminUserForm = ({ profile }: { profile: UserProfile }) => {
  const [image, setImage] = useState(profile?.image || "");
  const [adminEditUserProfile] = useAdminEditUserProfileMutation();
  const [isLoading, setLoading] = useState(false);

  const schema: ZodSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    image: z.string().nullish(),
    address: z.string().min(1),
    mobile: z.string().min(1),
  });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);

  useEffect(() => {
    setValue("first_name", profile?.first_name);
    setValue("last_name", profile?.last_name);
    setValue("address", profile?.address);
    setValue("mobile", profile?.mobile);
  }, []);
  const onSubmit = (data: any) => {
    setLoading(true);
    adminEditUserProfile({ id: profile?.id, ...data })
      .unwrap()
      .then(() => {
        setLoading(false);
        successToast();
      })
      .catch((err) => {
        setLoading(false);
        ErrorToast(err.status);
      });
  };

  return (
    <form
      className="flex flex-col gap-2 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("image")} hidden />

      <input
        type="text"
        {...register("first_name")}
        placeholder="نام"
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.first_name && (
        <p className="text-error text-xs">نام را وارد کنید</p>
      )}
      <input
        type="text"
        {...register("last_name")}
        placeholder="نام خانوادگی"
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.last_name && (
        <p className="text-error text-xs">نام خانوادگی را وارد کنید</p>
      )}
      <input
        type="text"
        {...register("address")}
        placeholder="آدرس "
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.last_name && (
        <p className="text-error text-xs">آدرس را وارد کنید</p>
      )}
      <input
        type="text"
        {...register("mobile")}
        placeholder="موبایل "
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.last_name && (
        <p className="text-error text-xs">موبایل را وارد کنید</p>
      )}

      <input
        type="text"
        disabled={true}
        value={profile?.user}
        className="input input-bordered w-full max-w-xs"
      />

      <OneFileUploader
        uploadedImageLink={image}
        uploadedImageLinkSetter={setImage}
        classname=""
      />
      {/* <div className="form-control">
        <label className="label cursor-pointer flex gap-1">
          <span className="label-text"> فعال؟ </span>
          <input
            {...register("is_active")}
            name="is_active"
            type="checkbox"
            className="toggle"
            value={String(checkStatus)}
            checked={checkStatus == "active" ? true : false}
            onChange={(e) => {
              setCheckStatus(!checkStatus);
            }}
          />
        </label>
      </div> */}

      {/* <button className=" btn btn-primary w-full">تبت</button> */}
      <LoadingButton isLoading={isLoading} className=" w-full" />
    </form>
  );
};

export default AdminUserForm;
