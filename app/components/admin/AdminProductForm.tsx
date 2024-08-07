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
import classNames from "classnames";

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
    image: z.string().min(1),
    price: z.string().min(1),
    description: z.string().nullish(),
    category: z.string().nullish(),
    kind: z.string().min(1),
    modified_by: z.string().min(1),
    diameter: z.string().min(1),
    state: z.string().min(1),
    analyze: z.string().min(1),
    unit: z.string().min(1),
    quantity: z.string().min(1),
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
    setValue("image", image, { shouldValidate: true });
  }, [image, setValue]);
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [dispatch, isFetching]);
  useEffect(() => {}, [error]);
  const onSubmit = (data: any) => {
    if (product) {
      editProduct({ ...data, id: product.id })
        .unwrap()
        .then(() => {
          successToast();
          // reset(data);
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
      className="flex flex-col gap-2 items-start max-w-sm mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("image")} hidden />
      <input
        type="text"
        {...register("name")}
        placeholder="نام کالا"
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.name,
        })}
      />
      {errors?.name && (
        <p className="text-error text-xs">نام محصول را وارد کنید</p>
      )}
      <input
        type="text"
        {...register("english_name")}
        placeholder="نام انگلیسی کالا"
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.english_name,
        })}
      />
      {errors?.english_name && (
        <p className="text-error text-xs">نام انگلیسی محصول را وارد کنید</p>
      )}
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <NumericFormat
            type="text"
            className={classNames("input input-bordered w-full", {
              "input-error": errors?.price,
            })}
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
      <textarea
        className="textarea textarea-bordered w-full"
        {...register("description")}
        id="description"
        placeholder="توضیحات"
      ></textarea>
      <select
        defaultValue={"0"}
        className={classNames("select select-bordered w-full", {
          "input-error": errors?.category,
        })}
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
      <input
        placeholder="نوع:نانو ذره پلیمری-فلزی یا ...."
        {...register("kind")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.kind,
        })}
        type="text"
      />
      {errors?.kind && <p className="text-error text-xs">نوع را وارد نمایید</p>}
      <input
        placeholder="اصلاح شده با "
        {...register("modified_by")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.modified_by,
        })}
        type="text"
      />
      {errors?.modified_by && (
        <p className="text-error text-xs">اصلاح شده با را وارد کنید</p>
      )}
      <input
        placeholder="ابعاد با واحد نانومتر"
        {...register("diameter")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.diameter,
        })}
        type="text"
      />
      {errors?.diameter && (
        <p className="text-error text-xs">ابعاد را وارد کنید</p>
      )}
      <input
        placeholder="واحد: gr,mL,gr/mL..."
        {...register("unit")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.unit,
        })}
        type="text"
      />
      {errors?.unit && <p className="text-error text-xs">واحد را وارد کنید</p>}
      <input
        placeholder="مقدار به عدد"
        {...register("quantity")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.quantity,
        })}
        type="text"
      />
      {errors?.quantity && (
        <p className="text-error text-xs">مقدار را وارد کنید</p>
      )}

      <input
        placeholder="حالت: پودر-سوسپانسیون..."
        {...register("state")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.state,
        })}
        type="text"
      />
      {errors?.state && <p className="text-error text-xs">حالت را وارد کنید</p>}
      <input
        placeholder="آنالیز:FTRR,SEM,DLS,UV,..."
        {...register("analyze")}
        className={classNames("input input-bordered w-full", {
          "input-error": errors?.analyze,
        })}
        type="text"
      />
      {errors?.analyze && (
        <p className="text-error text-xs">آنالیز را وارد کنید</p>
      )}
      <OneFileUploader
        classname={classNames({ "input-error": errors?.image })}
        uploadedImageLink={image}
        uploadedImageLinkSetter={setImage}
      />
      {errors?.image && <p className="text-error text-xs">عکس انتخاب کنید</p>}
      <LoadingButton isLoading={createIsLoading} className=" w-full" />
    </form>
  );
};

export default AdminProductForm;
