/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useEditStoreMutation,
  useFetchStoreQuery,
} from "@/lib/features/api/api";
import LoadingButton from "../utils/LoadingButton";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import { Store } from "@/app/types";

const AdminStoreForm = ({ store }: { store: Store }) => {
  const [editStore] = useEditStoreMutation();
  const [isLoading, setLoading] = useState(false);

  const schema: ZodSchema = z.object({
    aboutus: z.string().nullish(),
    supportNumber: z.string().nullish(),
    telegram: z.string().nullish(),
    whatsapp: z.string().nullish(),
    phoneNumber: z.string().nullish(),
    mobileNumber: z.string().nullish(),
    address: z.string().nullish(),
  });
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: store,
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    editStore({ id: store?.id, ...data })
      .unwrap()
      .then(() => {
        setLoading(false);
        successToast();
      })
      .catch((err) => {
        setLoading(false);
        ErrorToast(err.status);
      });
  };

  return (
    <form
      className="flex flex-col gap-2 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        className="textarea textarea-bordered w-full max-w-xs"
        {...register("aboutus")}
        placeholder="درباره ما"
      ></textarea>

      <input
        type="text"
        {...register("telegram")}
        placeholder="تلگرام"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        {...register("whatsapp")}
        placeholder="واتساپ"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        {...register("address")}
        placeholder="آدرس "
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        {...register("supportNumber")}
        placeholder="تلفن پشتبانی"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        {...register("mobileNumber")}
        placeholder="موبایل "
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        {...register("phoneNumber")}
        placeholder="تلفن ثابت"
        className="input input-bordered w-full max-w-xs"
      />
      <LoadingButton isLoading={isLoading} className=" w-full" />
    </form>
  );
};

export default AdminStoreForm;
