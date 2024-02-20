import React from "react";
import { BsHeart } from "react-icons/bs";
import Rating from "./rating";
import Image from "next/image";

const Card = () => {
  return (
    <div className="rounded-lg shadow-md">
      <div className="relative">
        <a href="#" className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Benzene-2D-full.svg.png"
            alt=""
            className="object-cover w-full mx-auto rounded-md"
          />
        </a>
        <span className="absolute top-0 right-0 px-4 py-2 m-2 lg:px-2 lg:py-1 text-sm font-semibold text-secondary-content bg-secondary rounded-md">
          ۱۶٪ تخفیف
        </span>
        <div className="absolute flex items-center justify-center p-2 text-center text-gray-700 rounded-full shadow-xl cursor-pointer right-3 bottom-3 bg-gray-50 hover:text-primary-content hover:bg-primary w-11 h-11">
          <div>
            <BsHeart />
          </div>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200 bg-white  rounded-b-md ">
        <h3 className="mb-3 text-xl font-medium text-start">
          <a href="#"> محصول یک</a>
        </h3>
        <div className="relative flex flex-row-reverse items-center justify-between mb-3 text-left">
          <p className="text-lg font-medium text-neutral flex flex-col items-start justify-center">
            <span className="ml-2 line-through text-sm">۱.۵۰۰.۰۰۰ </span>
            <span className="text-primary ">۱.۲۰۰.۰۰۰ تومان</span>
          </p>
          <p className=" btn btn-primary"> افزودن به سبد</p>
        </div>
        <div className="w-full flex flex-row justify-end">
          <Rating />
        </div>
      </div>
    </div>
  );
};

export default Card;
