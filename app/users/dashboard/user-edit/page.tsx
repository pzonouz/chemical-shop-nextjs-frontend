/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import InputBox from "@/app/components/data/InputBox";
import ErrorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import {
  useEditUserProfileMutation,
  useFetchUserQuery,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/app/components/utils/LoadingButton";

export default function UserEditForm() {
  const { data: user, error, isFetching } = useFetchUserQuery();
  const [editUser, { isLoading }] = useEditUserProfileMutation();

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
    isFetching ? setLoading() : unsetLoading();
  }, [isFetching]);
  useEffect(() => {
    ErrorToast((error as any)?.originalStatus);
  }, [error]);
  useEffect(() => {
    setValue("first_name", user?.profile?.first_name);
    setValue("last_name", user?.profile?.last_name);
    setValue("address", user?.profile?.address);
    setValue("mobile", user?.profile?.mobile);
  }, []);
  useEffect(() => {
    toast.error((error as any)?.originalStatus);
  }, [error]);

  const userFormSubmit = (data: any) => {
    const profile = { ...data };
    const newUserData = { ...user };
    newUserData.profile = profile;
    editUser(newUserData)
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
        className="input input-bordered w-full max-w-xs"
      />
      {errors.first_name ? (
        <p className=" text-xs text-error">نام را وارد کنید</p>
      ) : null}

      <input
        {...register("last_name")}
        type="text"
        placeholder="نام خانوادگی"
        className="input input-bordered w-full max-w-xs"
      />
      {errors.last_name ? (
        <p className=" text-xs text-error">نام خانوادگی را وارد کنید</p>
      ) : null}

      <input
        {...register("mobile")}
        type="text"
        placeholder="موبایل"
        className="input input-bordered w-full max-w-xs"
      />
      {errors.mobile ? (
        <p className=" text-xs text-error">موبایل را وارد کنید</p>
      ) : null}

      <input
        {...register("address")}
        type="text"
        placeholder="آدرس"
        className="input input-bordered w-full max-w-xs"
      />
      {errors.mobile ? (
        <p className=" text-xs text-error">آدرس را وارد کنید</p>
      ) : null}
      <LoadingButton isLoading={isLoading} />
    </form>
  );
}
