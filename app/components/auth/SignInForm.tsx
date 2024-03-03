"use client";
import { FcGoogle } from "react-icons/fc";
import InputBox from "@/app/components/data/InputBox";
import { signIn, useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "react-toastify";

const SignInForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  status === "authenticated" ? router.push("/") : null;
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
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    setLoading(false);
    if (signInResponse?.ok) {
      router.push("/");
    } else {
      toast.error("نام کاربری و پسورد مطابقت ندارد", {
        position: "top-right",
      });
    }
  };
  return (
    <div className=" flex flex-col px-8 gap-8 mt-12">
      <button
        className="btn"
        onClick={() => {
          signIn("google");
        }}
      >
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

export default SignInForm;
