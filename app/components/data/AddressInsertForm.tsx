import fetchWithTokenClient from "@/app/utils/FetchWithTokenClient";
import React from "react";
import { useForm } from "react-hook-form";

const AddressEditForm = () => {
  const onFormSubmit = async (data: any) => {
    const res = await fetchWithTokenClient("/api/addresses", "POST", data);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <form
      className="flex flex-col p-4 gap-4"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <textarea
        className="textarea textarea-bordered"
        placeholder="آدرس جدید را وارد کنید"
        {...register("address", { required: true })}
      ></textarea>
      {errors?.address && (
        <p className="text-error text-sm">آدرس را وارد کنید</p>
      )}
      <button className=" btn btn-primary">ثبت</button>
    </form>
  );
};

export default AddressEditForm;
