"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { Product } from "@prisma/client";

const AdminProductForm = ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const [image, setImage] = useState(product?.image || "");
  const [numberValue, setNumberValue] = useState(undefined);

  //mask with thousand separator
  const addCommas = (num: any) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, "");
  const numberHandleChange = (event: any) =>
    setNumberValue(addCommas(removeNonNumeric(event.target.value)));

  const schema = z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    image: z.string().nullish(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: product ? schema.parse(product) : {},
  });

  const onSubmit = async (data: any) => {
    //remove thousand separator mask(,)
    data = { ...data, price: (data.price as string).replaceAll(",", "") };
    console.log(data);
  };

  //update uploadedImageLink value
  useEffect(() => {
    setValue("image", image);
  }, [image]);

  //mask with thousand separator
  useEffect(() => {
    setValue("price", numberValue!);
  }, [numberValue]);
  return (
    <form
      className=" flex flex-col items-start justify-between gap-2 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("image")} hidden />
      <InputBox
        name="name"
        type="text"
        errors={errors}
        registerFn={register}
        text="نام محصول را وارد کنید"
      />
      {errors["name"] ? (
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
      {errors["price"] ? (
        <p className=" text-error text-sm">قیمت محصول را وارد کنید</p>
      ) : null}
      <OneFileUploader
        uploadedImageLink={image}
        uploadedImageLinkSetter={setImage}
      />
      <button className="btn btn-primary w-full">ثبت</button>
    </form>
  );
};

export default AdminProductForm;
