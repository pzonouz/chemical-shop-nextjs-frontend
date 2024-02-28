import React from "react";
import { FieldErrors } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface InputBoxProps {
  name: string;
  errors: FieldErrors;
  registerFn: any;
  type: string;
  text: string;
}

const InputBox = ({ name, errors, registerFn, type, text }: InputBoxProps) => {
  return (
    <label
      className={`input input-bordered flex items-center gap-2 w-full
        ${errors[name] ? "text-error border-error" : null}`}
    >
      {name === "email" ? <MdAlternateEmail /> : null}
      {name === "password" ? <RiLockPasswordFill /> : null}
      {name === "confirmPassword" ? <RiLockPasswordFill /> : null}
      <input
        type={type}
        className=""
        placeholder={text}
        {...registerFn(name)}
      />
    </label>
  );
};

export default InputBox;
