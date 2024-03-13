"use client";
import InputBox from "@/app/components/data/InputBox";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const schema: ZodSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.ok) {
      setLoading(false);
      successToast();
      setTimeout((e) => {}, 2000);
      router.push("/");
    } else {
      setLoading(false);
      errorToast(JSON.stringify(resData));
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-2 w-full"
    >
      <input name="csrfToken" type="hidden" defaultValue={""} />
      <InputBox
        type="text"
        name="email"
        errors={errors}
        registerFn={register}
        text="ایمیل را وارد نمایید"
      />
      {errors["email"]?.type === "too_small" && (
        <p className=" text-xs text-error">ایمیل وارد نمایید</p>
      )}
      <InputBox
        type="password"
        name="password"
        errors={errors}
        registerFn={register}
        text="پسورد را وارد نمایید"
      />
      {errors["password"]?.type === "too_small" && (
        <p className=" text-xs text-error"> پسورد را وارد کنید </p>
      )}

      <button type="submit" className=" btn btn-primary">
        ورود
        {isLoading && (
          <span className="loading loading-spinner absolute right-1/3"></span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
