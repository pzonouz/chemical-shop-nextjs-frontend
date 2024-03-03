"use client";

import InputBox from "@/app/components/data/InputBox";
import ErrorToast from "@/app/utils/ErrorToast";
import successToast from "@/app/utils/SuccessToast";
import { useEditUserMutation, useFetchUserQuery } from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserEditForm() {
  const { data: user, error, isFetching } = useFetchUserQuery();
  const [editUser, { isLoading }] = useEditUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [isFetching, dispatch]);
  useEffect(() => {
    ErrorToast(error?.originalStatus);
  }, [error]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    toast.error(error?.originalStatus);
  }, [error]);
  useEffect(() => {
    //For updating form data after state update, default values caches at first render and must change by reset after state cha
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      mobile: user?.mobile,
      address: user?.address,
    });
  }, [user, reset]);
  const userFormSubmit = (data: any) => {
    editUser(data)
      .then((res: any) => {
        if (res.error) {
          throw new Error(res.error.originalStatus);
        }
        successToast();
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-right" });
      });
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
      <textarea
        className="textarea textarea-bordered"
        placeholder="آدرس"
        {...register("address")}
      ></textarea>
      <button className=" btn btn-primary relative">
        ثبت
        {isLoading && (
          <span className=" loading loading-spinner absolute right-1/3"></span>
        )}
      </button>
    </form>
  );
}
