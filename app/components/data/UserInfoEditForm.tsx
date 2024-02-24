"use client";
import { set, useForm } from "react-hook-form";
import InputBox from "./InputBox";
import { User } from "@/app/api/auth/register/route";
import fetchWithTokenClient from "@/app/utils/FetchWithTokenClient";
import Toast from "../utils/Toast";
import { useState } from "react";

const UserInfoEditForm = ({ user }: { user: User | null | undefined }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: user! });
  const userFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetchWithTokenClient(`/api/users`, "PATCH", data);
      setLoading(false);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error?.name);
      } else {
        setSuccess(true);
        setSuccessText("با موفقیت انجام شد");
      }
    } catch (error) {
      setError(true);
      setErrorText(error?.message || "خطای ناشناخته");
    }
  };
  return (
    <form
      className=" w-full p-4 flex flex-col gap-4"
      onSubmit={handleSubmit(userFormSubmit)}
    >
      <InputBox
        name="firstName"
        errors={errors}
        registerFn={register}
        type="text"
        text="نام"
      />
      <InputBox
        name="lastName"
        errors={errors}
        registerFn={register}
        type="text"
        text="نام خانوادگی"
      />
      <InputBox
        name="mobile"
        errors={errors}
        registerFn={register}
        type="text"
        text="موبایل"
      />
      <button className=" btn btn-primary relative">
        ثبت
        {isLoading && (
          <span className=" loading loading-spinner absolute right-1/3"></span>
        )}
      </button>
      <Toast
        state={error}
        stateSetter={setError}
        text={errorText}
        type="error"
      />
      <Toast
        state={success}
        stateSetter={setSuccess}
        text={successText}
        type="success"
      />
    </form>
  );
};

export default UserInfoEditForm;
