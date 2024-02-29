"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hooks";

const AdminCategoryForm = () => {
  const dispatch = useAppDispatch();
  const [uploadedImageLink, setUploadedImageLink] = useState("");
  const schema = z.object({
    name: z.string().min(1),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    dispatch({ type: "categoryCreateApiFetchBegan", payload: data });
  };

  return (
    <form
      className="flex flex-col gap-2 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        value={uploadedImageLink}
        {...register("uploadedImageLink")}
        hidden
      />
      <InputBox
        type="text"
        text="نام دسته بندی را وارد نمایید"
        registerFn={register}
        name="name"
        errors={errors}
      />
      {errors?.name && (
        <p className="text-error text-xs">نام دسته بندی را وارد کنید</p>
      )}
      <OneFileUploader
        uploadedImageLink={uploadedImageLink}
        uploadedImageLinkSetter={setUploadedImageLink}
      />
      <button className=" btn btn-primary w-full">تبت</button>
    </form>
  );
};

export default AdminCategoryForm;
