import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import AddressEditForm from "./AddressEditForm";
import { useAppSelector } from "@/lib/hooks";
import { createSelector } from "reselect";

const Address = () => {
  const addressesSelector = createSelector(
    (state) => state.user,
    (user) => user.addresses
  );

  const addresses = useAppSelector(addressesSelector) || [];

  return (
    <div className=" p-2 align-center flex flex-col">
      {addresses.map((item: any) => {
        return (
          <>
            <p>
              {item.address}
              {/* چهار راه طالقانی به سمت بیمارستان ارتش.نرسیده به قنادی پاپا. طبقه بالای
        گلفروشی لیلیوم. آموزشگاه جاویدان صنعت. آقای محمد نژاد */}
            </p>
            <div className=" self-end text-xl flex items-center gap-2">
              <MdEdit
                className=" text-info cursor-pointer"
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLFormElement
                  ).showModal()
                }
              />
              <AiFillDelete
                className="text-error cursor-pointer"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLFormElement
                  ).showModal()
                }
              />
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box flex flex-col gap-4">
                <div>پاک شود؟</div>
                <button className="btn btn-error">بله</button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <AddressEditForm />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        );
      })}
    </div>
  );
};

export default Address;
