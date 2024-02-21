"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

const UserRegisterPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
    setError(null);
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }
      setLoading(false);
      router.push("/api/auth/signin");
    } catch (err: unknown) {
      setLoading(false);
      if (typeof err === "string") setError(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <div className=" flex flex-col items-center mt-6">
      <div className=" text-xl font-bold">ایجاد کاربر جدید</div>
      <form
        className=" flex flex-col gap-2 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className={`input input-bordered flex items-center gap-2
        ${errors.email ? "text-error border-error" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="ایمیل خود را وارد کنید"
            {...register("email")}
          />
        </label>
        {errors.email?.type === "too_small" && (
          <p className=" text-xs text-error">ایمیل را وارد نمایید</p>
        )}
        {errors.email?.type === "invalid_string" && (
          <p className=" text-xs text-error">ساختار ایمیل درست نیست</p>
        )}
        <label
          className={`input input-bordered flex items-center gap-2
        ${errors.password ? "text-error border-error" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="پسورد خود را وارد کنید"
            {...register("password")}
          />
        </label>
        {errors.password?.type === "too_small" && (
          <p className=" text-xs text-error">حداقل ۸ کاراکتر</p>
        )}
        <label
          className={`input input-bordered flex items-center gap-2
        ${errors.confirmPassword ? "text-error border-error" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="پسورد خود را دوباره وارد کنید"
            {...register("confirmPassword")}
          />
        </label>
        {errors.confirmPassword?.type === "custom" && (
          <p className=" text-xs text-error">پسورد ها منطبق نیست</p>
        )}
        <button className="btn btn-primary text-lg font-extrabold relative">
          {isLoading && (
            <span className="loading loading-spinner absolute right-1/3"></span>
          )}
          ثبت
        </button>
        <Toast
          state={error}
          stateSetter={setError}
          text={error!}
          type="error"
        />
      </form>
    </div>
  );
};

export default UserRegisterPage;
