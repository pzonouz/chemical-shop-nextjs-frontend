import AddToCartButtonWithCount from "@/app/components/data/AddtoCartButtonWithCount";
import { Product } from "@/app/types";
export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
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
      // errorToast(err.message);
    }
  };
  const product: Product = await FetchProduct(id);
  return (
    <div className="mt-12 mx-2 bg-base-200 p-4 grid grid-cols-1 gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product?.image}
        alt={product?.name}
        className=" rounded-tl-lg rounded-tr-lg"
      />
      <div className=" px-2 flex flex-col gap-2">
        <div className=" flex flex-row items-center justify-between">
          <div className=" text-xl font-bold">{product?.name}</div>
          <div className=" text-md">{product?.english_name}</div>
        </div>

        <AddToCartButtonWithCount product={product} />
      </div>
    </div>
  );
}
