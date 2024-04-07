// import Rating from "../utils/Rating";
import { Product } from "@/app/types";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import Favorite from "./Favorite";

const Card = ({ product }: { product: Product }) => {
  return (
    <div className="rounded-lg shadow-md">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt=""
          className="object-cover w-full mx-auto rounded-md"
        />
        {/* </a> */}
        {/* <span className="absolute top-0 right-0 px-4 py-2 m-2 lg:px-2 lg:py-1 text-sm font-semibold text-secondary-content bg-secondary rounded-md">
          ۱۶٪ تخفیف
        </span> */}
        <Favorite product={product} />
      </div>
      <div className="p-4 border-b border-gray-200 bg-white  rounded-b-md ">
        <div className=" flex justify-between items-center">
          <h3 className="mb-3 text-xl font-medium text-start">
            <a> {product?.name}</a>
          </h3>
          <div>{product.english_name}</div>
        </div>
        <div className="relative flex flex-row-reverse items-center justify-between mb-3 text-left">
          <p className="text-lg font-medium text-neutral flex flex-col items-start justify-center">
            {/* <span className="ml-2 line-through text-sm">{product?.price} </span> */}
            <span className="text-primary ">
              {ToPersianDigit(product?.price.toString())} تومان
            </span>
          </p>
          <AddToCartButton product={product} />
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <Link
            href={`/products/${product.id}`}
            className=" btn btn-error text-white"
          >
            اطلاعات بیشتر
          </Link>
          {/* <Rating /> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
