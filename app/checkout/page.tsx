"use client";
import { MdEdit } from "react-icons/md";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchUserQuery } from "@/lib/features/api/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { isFetching, data: user, error } = useFetchUserQuery();
  const router = useRouter();
  const onSubmit = () => {};
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (error != undefined && "status" in error && error.status == 401) {
      router.push("/authentication/login");
    }
  }, [error, router]);
  return (
    <form className=" bg-base-200 p-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className=" m-2 flex p-8 flex-row gap-4 bg-white rounded-lg text-primary ">
          <p>زمان تامین کالا:</p>
          <p>حداکثر ۶روز کاری</p>
        </div>
        <div className=" m-2 flex p-2 flex-col gap-4 bg-white rounded-lg text-slate-800">
          <div className=" border-b-2 py-1">انتخاب شیوه ارسال:</div>
          <div className=" flex flex-row">
            <div className=" w-fit">
              <div className="form-control flex flex-row justify-start">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    className="radio checked:bg-primary"
                    value={"post"}
                    {...register("deliveryMethod")}
                  />
                  <span className="label-text mx-2">پست</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    className="radio checked:bg-primary"
                    {...register("deliveryMethod")}
                    value={"inPlace"}
                  />
                  <span className="label-text mx-2"> مراجعه حضوری</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" m-2 flex p-2 flex-col gap-4 bg-white rounded-lg text-slate-800">
          <div className="border-b-2 py-1 flex items-center justify-between px-2">
            <div>آدرس ارسال</div>
            <div className=" text-xs flex gap-1 text-error">
              <p>ویرایش</p>
              <MdEdit />
            </div>
          </div>
          <div>{user?.address}</div>
        </div>
      </div>
    </form>
  );
}
