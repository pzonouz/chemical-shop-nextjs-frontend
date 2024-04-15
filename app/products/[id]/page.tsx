/* eslint-disable react-hooks/exhaustive-deps */
import AddToCartButtonWithCount from "@/app/components/data/AddtoCartButtonWithCount";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import { useAppDispatch } from "@/lib/hooks";
export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Not using RTKQuery because of needs of useEffect that make this component client but I dont want it
  const FetchProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost/api/products/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resData = await res.json();
      return resData;
    } catch (err) {
      errorToast((err as any).message);
    }
  };
  const product: Product = await FetchProduct(id);
  return (
    <div className="mt-6 bg-base-200 p-3 grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:auto-rows-max md:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product?.image}
        alt={product?.name}
        className=" rounded-tl-lg rounded-tr-lg w-full md:w-5/6 md:rounded-lg"
      />
      <div className=" px-2 flex flex-col gap-2 md:gap-6">
        <div className=" flex flex-col items-center justify-center ">
          <div className=" flex flex-row items-center justify-between w-full">
            <div className=" text-xl font-bold col-start-1 col-end-2">
              {product?.name}
            </div>
            <div className=" text-md col-start-2 col-end-3 ">
              {product?.english_name}
            </div>
          </div>
        </div>
        <AddToCartButtonWithCount product={product!} />
      </div>
      <div className=" whitespace-pre-wrap pt-12 leading-10 border-t-2 border-gray-700 md:pt-2 md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3">
        {product?.description}
      </div>
    </div>
  );
}
