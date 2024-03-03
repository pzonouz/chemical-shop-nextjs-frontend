"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from "@/lib/features/api/api";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import LoadingButton from "../utils/LoadingButton";

const AdminCategoryForm = ({
  category,
}: {
  category: Category | null | undefined;
}) => {
  const [image, setImage] = useState(category?.image || "");
  const [createCategory, { isLoading: createIsLoading }] =
    useCreateCategoryMutation();
  const [editCategory, { isLoading: editIsLoading }] =
    useEditCategoryMutation();

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
      editCategory({ ...data, id: category.id })
        .then((res: any) => {
          if (res.error) {
            throw new Error(res.error.originalStatus);
          }
          successToast();
          reset(data);
          setImage("");
        })
        .catch((error) => {
          ErrorToast(error.message);
        });
    } else {
      createCategory(data)
        .then((res: any) => {
          if (res.error) {
            throw new Error(res.error.originalStatus);
          }
          successToast();
          reset();
          setImage("");
        })
        .catch((error) => {
          ErrorToast(error.message);
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
      <LoadingButton
        isLoading={createIsLoading || editIsLoading}
        className=" w-full"
      />
    </form>
  );
};

export default AdminCategoryForm;
