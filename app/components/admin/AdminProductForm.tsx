"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import { useState } from "react";

const AdminProductForm = () => {
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (!file) {
      return;
    }
    const fileData = new FormData();
    fileData.set("file", file);
    console.log(fileData);
    const res = await fetch("/admin/api/images", {
      headers: { "Content-Type": "image/jpeg" },
      method: "POST",
      body: fileData,
    });
  };
  return (
    <form
      className=" flex flex-col items-center justify-between gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputBox
        name="productName"
        type="text"
        errors={errors}
        registerFn={register}
        text="نام محصول را وارد کنید"
      ></InputBox>
      <input
        type="file"
        className="file-input w-full max-w-xs"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
      />

      <button className="btn btn-primary w-full">ثبت</button>
    </form>
  );
};

export default AdminProductForm;
