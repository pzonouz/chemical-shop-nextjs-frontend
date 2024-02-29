"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";

const schema = z.object({
  productName: z.string().min(1),
  price: z.string().min(1),
});

const AdminProductForm = () => {
  const [uploadedImageLink, setUploadedImageLink] = useState(null);
  const [numberValue, setNumberValue] = useState(undefined);

  //mask with thousand separator
  const addCommas = (num: any) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, "");
  const numberHandleChange = (event: any) =>
    setNumberValue(addCommas(removeNonNumeric(event.target.value)));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    //remove thousand separator mask(,)
    data = { ...data, price: (data.price as string).replaceAll(",", "") };
    console.log(data);
  };

  //update uploadedImageLink value
  useEffect(() => {
    setValue("uploadedImageLink", uploadedImageLink);
  }, [uploadedImageLink]);

  //mask with thousand separator
  useEffect(() => {
    setValue("price", numberValue);
  }, [numberValue]);
  return (
    <form
      className=" flex flex-col items-start justify-between gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("uploadedImageLink")} hidden type="text" />
      <InputBox
        name="productName"
        type="text"
        errors={errors}
        registerFn={register}
        text="نام محصول را وارد کنید"
      />
      {errors["productName"] ? (
        <p className=" text-error text-sx">نام محصول را وارد کنید</p>
      ) : null}
      <input
        className="input input-bordered flex items-center gap-2 w-full"
        name="price"
        type="string"
        value={numberValue!}
        onInput={numberHandleChange}
        placeholder="قیمت را وارد کنید"
      />
      {errors["productName"] ? (
        <p className=" text-error text-sm">قیمت محصول را وارد کنید</p>
      ) : null}
      <OneFileUploader
        uploadedImageLink={uploadedImageLink}
        uploadedImageLinkSetter={setUploadedImageLink}
      />
      <button className="btn btn-primary w-full">ثبت</button>
    </form>
  );
};

export default AdminProductForm;
