import { useForm } from "react-hook-form";
import InputBox from "./InputBox";

const UserInfoEditForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {};
  return (
    <form
      className=" w-full p-4 flex flex-col gap-4"
      onSubmit={() => {
        handleSubmit(onSubmit);
      }}
    >
      <InputBox
        name="firstName"
        errors={errors}
        registerFn={register}
        type="text"
        text="نام"
      />
      <InputBox
        name="lastName"
        errors={errors}
        registerFn={register}
        type="text"
        text="نام خانوادگی"
      />
      <InputBox
        name="mobilePhone"
        errors={errors}
        registerFn={register}
        type="text"
        text="موبایل"
      />
      <button className=" btn btn-primary">ثبت</button>
    </form>
  );
};

export default UserInfoEditForm;
