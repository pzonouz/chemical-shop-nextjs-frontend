import { Category, Product } from "@/app/types";
import Card from "./Card";
import React from "react";
import ErrorComponent from "./ErrorComponent";

let errorMessage: string | null = null;
async function GetCategories() {
  try {
    const res: Response = await fetch("http://localhost/api/categories", {
      cache: "no-store",
      headers: { "Content-Type": " application/vnd.api+json" },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (error: any) {
    return { error: { message: error.message } };
  }
}
const ProductListByCategory = async () => {
  const categories: Category[] = await GetCategories();
  return (
    <section className="mt-6 px-3 ">
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
