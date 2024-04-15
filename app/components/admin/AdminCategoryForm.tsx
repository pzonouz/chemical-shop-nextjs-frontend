"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from "@/lib/features/api/api";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import LoadingButton from "../utils/LoadingButton";
import { Category } from "@/app/types";

const AdminCategoryForm = ({
  category,
}: {
  category: Category | null | undefined;
}) => {
  const [image, setImage] = useState(category?.image || "");
  const [loading, setLoading] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

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
  }, [image, setValue]);
  const onSubmit = (data: any) => {
    if (category) {
      setLoading(true);
      editCategory({ ...data, id: category.id })
        .unwrap()
        .then(() => {
          setLoading(false);
          successToast();
          reset(data);
          setImage("");
        })
        .catch((err) => {
          setLoading(false);
          ErrorToast(err.status);
        });
    } else {
      setLoading(true);
      createCategory(data)
        .unwrap()
        .then(() => {
          setLoading(false);
          successToast();
          reset();
          setImage("");
        })
        .catch((err) => {
          setLoading(false);
          ErrorToast(err.status);
        });
    }
  };

  return (
    <form
      className="flex flex-col gap-2 items-start"
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
      {/* <button className=" btn btn-primary w-full">تبت</button> */}
      <LoadingButton isLoading={loading} className=" w-full" />
    </form>
  );
};

export default AdminCategoryForm;
