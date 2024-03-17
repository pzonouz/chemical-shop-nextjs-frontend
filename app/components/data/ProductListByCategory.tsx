"use server";
import { Category, Product } from "@/app/types";
import Card from "./Card";
import React from "react";
import ErrorComponent from "./ErrorComponent";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";

let errorMessage = null;
async function getCategories() {
  try {
    const res: Response = await fetch("http://localhost/api/categories", {
      cache: "no-store",
      headers: { "Content-Type": " application/vnd.api+json" },
      // headers: { "Content-Type": " application/json" },
    });
    if (!res.ok) {
      errorMessage = res.status;
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {}
}
const ProductListByCategory = async () => {
  setLoading();
  const categories: Category[] = await getCategories();
  unsetLoading();
  return (
    <section className="pt-12 px-3 ">
      {errorMessage && <ErrorComponent text={errorMessage}></ErrorComponent>}
      {!errorMessage &&
        categories?.map((category: Category) => (
          <div key={category?.id}>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex-auto border-t-2 border-b-2 h-[6px] text-center align-middle"></div>
              <div>{category?.name} </div>
              <div className="flex-auto border-t-2 border-b-2 h-[6px] text-center align-middle"></div>
            </div>
            <div className=" grid grid-cols-1 pt-6">
              {category?.products?.map((product: Product) => {
                return <Card key={product?.id} product={product} />;
              })}
            </div>
          </div>
        ))}
    </section>
  );
};

export default ProductListByCategory;
