"use client";
import { useForm } from "react-hook-form";
import InputBox from "./InputBox";
import fetchWithTokenClient from "@/app/utils/FetchWithTokenClient";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser, userInfoUpdated } from "@/lib/features/entities/user";
import { createSelector } from "reselect";
import { toast } from "react-toastify";

const UserInfoEditForm = () => {
  const dispatch = useAppDispatch();
  const userSelector = createSelector(
    (state) => state,
    (state: any) => state.user
  );
  const user: IUser = useAppSelector(userSelector);

  const [isLoading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: user! });
  useEffect(() => {
    //For updating form data after state update, default values caches at first render and must change by reset after state cha
    reset(user);
  }, [user, reset]);
  const userFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetchWithTokenClient(`/api/users`, "PATCH", data);
      setLoading(false);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error?.name);
      } else {
        dispatch(userInfoUpdated(data));
        toast.success("با موفقیت انجام شد", { position: "top-center" });
      }
    } catch (error) {
      toast.error((error as any).message || "خطای ناشناخته", {
        position: "top-center",
      });
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
    </form>
  );
};

export default UserInfoEditForm;
