"use client";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import InputBox from "@/app/components/data/InputBox";
import { useRegisterUserMutation } from "@/lib/features/api/api";
import { successToastWithMsg } from "@/app/utils/SuccessToast";
import errorToast from "@/app/utils/ErrorToast";

const UserRegisterPage = (props: any) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();

  const schema: ZodSchema = z
    .object({
      email: z.string().min(1).email(),
      password: z.string().min(8),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    registerUser(data)
      .unwrap()
      .then(() => {
        setLoading(false);
        successToastWithMsg("ایمیل خود را برای فعالسازی کنترل کنید");
        setTimeout(() => {}, 5000);
        router.push("/authentication/login");
      })
      .catch((err: any) => {
        setLoading(false);
        errorToast(JSON.stringify(err["data"]));
      });
  };
  return (
    <div className=" flex flex-col items-center mt-12 gap-6 px-8">
      <div className=" text-xl font-bold">ایجاد کاربر جدید</div>
      <form
        className=" flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputBox
          name="email"
          errors={errors}
          registerFn={register}
          type="text"
          text="ایمیل را وارد نمایید"
        />
        {errors["email"]?.type === "too_small" && (
          <p className=" text-xs text-error">ایمیل وارد نمایید</p>
        )}
        {errors["email"]?.type === "invalid_string" && (
          <p className=" text-xs text-error">ساختار ایمیل درست نیست</p>
        )}
        <InputBox
          name="password"
          errors={errors}
          registerFn={register}
          type="password"
          text="پسورد را وارد نمایید"
        />
        {errors["password"]?.type === "too_small" && (
          <p className=" text-xs text-error">حداقل ۸ کاراکتر را وارد کنید </p>
        )}
        <InputBox
          name="confirmPassword"
          errors={errors}
          registerFn={register}
          type="password"
          text="پسورد را تکرار نمایید"
        />
        {errors["confirmPassword"]?.type === "custom" && (
          <p className=" text-xs text-error">مقادیر پسورد منطبق نیست </p>
        )}

        <button className="btn btn-primary text-lg font-extrabold relative">
          {isLoading && (
            <span className="loading loading-spinner absolute right-1/3"></span>
          )}
          ثبت
        </button>
      </form>
    </div>
  );
};

export default UserRegisterPage;
