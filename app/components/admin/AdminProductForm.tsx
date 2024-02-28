"use client";
import { useForm } from "react-hook-form";
import InputBox from "../data/InputBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminProductForm = () => {
  const [file, setFile] = useState<File>();
  const [uploadedImageLink, setUploadedImageLink] = useState(null);
  const [numberValue, setNumberValue] = useState(null);

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
  } = useForm();

  const onSubmit = async (data: any) => {
    //remove thousand separator mask(,)
    data = { ...data, price: (data.price as string).replaceAll(",", "") };
    console.log(data);
  };
  const onFileUpload = async () => {
    try {
      const fileData = new FormData();
      if (!file) {
        return;
      }
      fileData.set("file", file!);
      const res = await fetch("/admin/api/images", {
        method: "POST",
        body: fileData,
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.code);
        throw new Error(data.code);
      }
      setUploadedImageLink(data.path);
      toast.success("موفق");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    onFileUpload();
  }, [file]);
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
      className=" flex flex-col items-center justify-between gap-2"
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
      <input
        className="input input-bordered flex items-center gap-2 w-full"
        name="price"
        type="string"
        value={numberValue!}
        onInput={numberHandleChange}
        placeholder="قیمت را وارد کنید"
      />

      <input
        type="file"
        className="file-input file-input-bordered max-w-xs w-full"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
      />
      {uploadedImageLink && (
        <a
          href={uploadedImageLink}
          target="_blank"
          className=" link hover:link-hover"
        >
          مشاهده عکس
        </a>
      )}

      <button className="btn btn-primary w-full">ثبت</button>
    </form>
  );
};

export default AdminProductForm;
