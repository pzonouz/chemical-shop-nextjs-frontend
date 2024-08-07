/* eslint-disable react-hooks/exhaustive-deps */
import AddToCartButtonWithCount from "@/app/components/data/AddtoCartButtonWithCount";
import { Product } from "@/app/types";
import errorToast from "@/app/utils/ErrorToast";
import { ToPersianDigit } from "@/app/utils/ToPersianDigit";
import {
  textToNumber,
  textToThousandSeparated,
} from "@/app/utils/numberConvert";
import { string } from "zod";
export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Not using RTKQuery because of needs of useEffect that make this component client but I dont want it
  const FetchProduct = async (id: string) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/products/${id}`, {
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
    <div className="p-3 grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:auto-rows-max md:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product?.image}
        alt={product?.name}
        className=" rounded-tl-lg rounded-tr-lg w-full md:w-5/6 md:rounded-lg"
      />
      <div className=" max-w-lg flex flex-col gap-2 items-center justify-center">
        <table className="table table-zebra">
          <tbody>
            <tr>
              <th>نام فارسی</th>
              <td>{product?.name}</td>
            </tr>
            <tr>
              <th>نام انگلیسی</th>
              <td>{product?.english_name}</td>
            </tr>
            <tr>
              <th>نوع ذره</th>
              <td>{product?.kind}</td>
            </tr>
            <tr>
              <th>حالت</th>
              <td>{product?.state}</td>
            </tr>
            <tr>
              <th>اصلاح شده با</th>
              <td>{product?.modified_by}</td>
            </tr>
            <tr>
              <th>مقدار </th>
              <td className="flex gap-1">
                <p>{product?.unit}</p>
                <p>{product?.quantity}</p>
              </td>
            </tr>
            <tr>
              <th>قطر ذره</th>
              <td>
                {ToPersianDigit(product?.diameter)}
                <span> </span>
                نانومتر
              </td>
            </tr>
            <tr>
              <th>آنالیز</th>
              <td>{product?.analyze}</td>
            </tr>
          </tbody>
        </table>
        {/* <div className=" flex flex-col items-center justify-center"> */}
        {/*   <div className=" flex flex-row items-center justify-between w-full"> */}
        {/*     <div className=" text-xl font-bold col-start-1 col-end-2"> */}
        {/*       {product?.name} */}
        {/*     </div> */}
        {/*     <div className=" text-md col-start-2 col-end-3 "> */}
        {/*       {product?.english_name} */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className="flex items-center justify-between w-full"> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">نوع ذره</div> */}
        {/*     <div>:</div> */}
        {/*     <div>{product?.kind}</div> */}
        {/*   </div> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">حالت</div> */}
        {/*     <div>:</div> */}
        {/*     <div>{product?.kind}</div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className="flex items-center justify-between w-full"> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">اصلاح شده با</div> */}
        {/*     <div>:</div> */}
        {/*     <div>{product?.modified_by}</div> */}
        {/*   </div> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">قطر ذره</div> */}
        {/*     <div>:</div> */}
        {/*     <div> */}
        {/*       {ToPersianDigit( */}
        {/*         textToThousandSeparated( */}
        {/*           textToNumber(product?.diameter?.toString()), */}
        {/*         ) as string, */}
        {/*       )} */}
        {/*     </div> */}
        {/**/}
        {/*     <div>نانومتر</div> */}
        {/*   </div> */}
        {/* </div> */}
        {/* <div className="flex items-center justify-between w-full"> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">آنالیز</div> */}
        {/*     <div>:</div> */}
        {/*     <div>{product?.analyze}</div> */}
        {/*   </div> */}
        {/*   <div className="flex gap-1"> */}
        {/*     <div className="font-semibold">مقدار</div> */}
        {/*     <div>:</div> */}
        {/*     <div>{product?.unit}</div> */}
        {/*     <div> */}
        {/*       {ToPersianDigit( */}
        {/*         textToThousandSeparated( */}
        {/*           textToNumber(product?.quantity?.toString()), */}
        {/*         ) as string, */}
        {/*       )} */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}

        <AddToCartButtonWithCount product={product!} />
      </div>
      <div className=" whitespace-pre-wrap pt-12 leading-10 border-t-2 border-gray-700 md:pt-2 md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3">
        {product?.description}
      </div>
    </div>
  );
}
