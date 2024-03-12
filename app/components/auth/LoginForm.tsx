"use client";
import { FcGoogle } from "react-icons/fc";
import InputBox from "@/app/components/data/InputBox";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoginUserMutation } from "@/lib/features/api/api";
import errorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useCookies } from "react-cookie";
import axios from "axios";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();
  const [cookies, setCookie] = useCookies(["access", "refresh"]);
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
    const response = fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => {
        setLoading(false);
        console.log(res);
        successToast();
        setTimeout((e) => {}, 2000);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        errorToast(JSON.stringify(err.data));
      });
    // loginUser(data)
    //   .unwrap()
    //   .then((res) => {
    //     setLoading(false);
    //     console.log(res);
    //     successToast();
    //     setTimeout((e) => {}, 2000);
    //     router.push("/");
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     errorToast(JSON.stringify(err.data));
    //   });
  };
  return (
    <div className=" flex flex-col px-8 gap-8 mt-12">
      <button className="btn" onClick={() => {}}>
        <FcGoogle className=" text-3xl" />
        <div>ورود با گوگل</div>
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2">
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
    </div>
  );
};

export default LoginForm;
