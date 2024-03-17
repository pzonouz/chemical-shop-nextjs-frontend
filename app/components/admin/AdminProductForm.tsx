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
import { useAppDispatch } from "@/lib/hooks";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";

const AdminProductForm = ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(product?.image || "");
  const [createProduct, { isLoading: createIsLoading }] =
    useCreateProductMutation();
  const [editProduct] = useEditProductMutation();
  const { data: categories, isFetching, error } = useFetchCategoriesQuery();

  const schema: ZodSchema = z.object({
    name: z.string().min(1),
    english_name: z.string().min(1),
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
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [dispatch, isFetching]);
  useEffect(() => {
    console.log(error);
  }, [error]);
  const onSubmit = (data: any) => {
    if (product) {
      editProduct({ ...data, id: product.id })
        .unwrap()
        .then(() => {
          successToast();
          reset(data);
        })
        .catch((err) => {
          ErrorToast(err.status);
        });
    } else {
      createProduct(data)
        .unwrap()
        .then(() => {
          successToast();
          reset();
          setValue("price", "");
          setImage("");
        })
        .catch((err) => {
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

      <input
        type="text"
        {...register("name")}
        placeholder="نام کالا"
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.name && (
        <p className="text-error text-xs">نام محصول را وارد کنید</p>
      )}
      <input
        type="text"
        {...register("english_name")}
        placeholder="نام انگلیسی کالا"
        className="input input-bordered w-full max-w-xs"
      />
      {errors?.name && (
        <p className="text-error text-xs">نام انگلیسی محصول را وارد کنید</p>
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
            ref={null}
            thousandSeparator={true}
            placeholder="قیمت"
          />
        )}
      />
      {errors?.price && (
        <p className="text-error text-xs"> قیمت را وارد کنید</p>
      )}
      <select
        defaultValue={"0"}
        className="select select-bordered w-full max-w-xs"
        {...register("category")}
      >
        <option disabled value={"0"}>
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
      <LoadingButton isLoading={createIsLoading} className=" w-full" />
    </form>
  );
};

export default AdminProductForm;
