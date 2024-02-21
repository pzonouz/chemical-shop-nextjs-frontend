"use client";
import InputBox from "@/app/components/data/InputBox";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-2 p-4"
    >
      <input name="csrfToken" type="hidden" defaultValue={""} />
      <InputBox
        type="text"
        name="email"
        errors={errors}
        registerFn={register}
      />
      <InputBox
        type="password"
        name="password"
        errors={errors}
        registerFn={register}
      />

      <button type="submit" className=" btn btn-primary">
        Sign in
      </button>
    </form>
  );
}
