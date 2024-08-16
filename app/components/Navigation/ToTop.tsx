"use client";
import { FaChevronUp } from "react-icons/fa6";

const ToTop = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className=" p-2 fixed bottom-6 right-6 cursor-pointer bg-accent text-white rounded-full border-2 border-accent"
    >
      <FaChevronUp className=" text-2xl " />
    </div>
  );
};

export default ToTop;
