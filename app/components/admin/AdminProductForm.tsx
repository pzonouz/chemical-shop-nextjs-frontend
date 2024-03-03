"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import OneFileUploader from "./OneFileUploader";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useFetchCategoriesQuery,
} from "@/lib/features/api/api";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import LoadingButton from "../utils/LoadingButton";

const AdminProductForm = ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const [image, setImage] = useState(product?.image || "");
  const [createProduct, { isLoading: createIsLoading }] =
    useCreateProductMutation();
  const [editProduct, { isLoading: editIsLoading }] = useEditProductMutation();
  const { data: categories, isLoading, error } = useFetchCategoriesQuery();

  const schema = z.object({
    name: z.string().min(1),
    image: z.string().nullish(),
    categoryId: z
      .string()
      .min(1)
      .refine((value: string) => value != "0"),
  });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: product ? schema.parse(product) : {},
  });
  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);
  const onSubmit = (data: any) => {
    if (product) {
      editProduct({ ...data, id: product.id })
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
      createProduct(data)
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
        text="نام محصول را وارد نمایید"
        registerFn={register}
        name="name"
        errors={errors}
      />
      {errors?.name && (
        <p className="text-error text-xs">نام محصول را وارد کنید</p>
      )}
      <select
        className="select select-bordered w-full max-w-xs"
        {...register("categoryId")}
      >
        <option disabled selected value={"0"}>
          دسته بندی
        </option>
        {categories?.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors?.categoryId && (
        <p className="text-error text-xs">دسته بندی را وارد کنید</p>
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

export default AdminProductForm;
