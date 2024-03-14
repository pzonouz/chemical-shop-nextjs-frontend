"use client";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateProductMutation,
  useEditProductMutation,
  useFetchCategoriesQuery,
} from "@/lib/features/api/api";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import LoadingButton from "../utils/LoadingButton";
import OneFileUploader from "./OneFileUploader";
import { Product } from "@/app/types";

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

  const schema: ZodSchema = z.object({
    name: z.string().min(1),
    image: z.string().nullish(),
    price: z.string().min(1),
    category: z.string().nullish(),
  });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
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
          setValue("price", "");
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

      <input
        type="text"
        {...register("name")}
        placeholder="نام کالا"
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.name && (
        <p className="text-error text-xs">نام محصول را وارد کنید</p>
      )}

      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <NumericFormat
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...field}
            thousandSeparator={true}
            placeholder="قیمت"
          />
        )}
      />
      {errors?.price && (
        <p className="text-error text-xs"> قیمت را وارد کنید</p>
      )}
      <select
        className="select select-bordered w-full max-w-xs"
        {...register("category")}
      >
        <option disabled selected value={"0"}>
          دسته بندی
        </option>
        {categories?.map((category) => (
          <option value={category.name} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors?.category && (
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
