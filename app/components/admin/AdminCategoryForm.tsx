"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hooks";
import { Category } from "@prisma/client";

const AdminCategoryForm = ({
  category,
}: {
  category: Category | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(category?.image || "");

  const schema = z.object({
    name: z.string().min(1),
    image: z.string().nullish(),
  });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: category ? schema.parse(category) : {},
  });
  useEffect(() => {
    setValue("image", image);
  }, [image]);
  const onSubmit = (data: any) => {
    if (category) {
      dispatch({
        type: "categoryUpdateApiFetchBegan",
        payload: { id: category.id, data: data },
      });
    } else {
      dispatch({ type: "categoryCreateApiFetchBegan", payload: data });
      reset();
      setImage("");
    }
  };

  return (
    <form
      className="flex flex-col gap-2 items-start p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("image")} hidden />
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
        uploadedImageLink={image}
        uploadedImageLinkSetter={setImage}
      />
      <button className=" btn btn-primary w-full">تبت</button>
    </form>
  );
};

export default AdminCategoryForm;
