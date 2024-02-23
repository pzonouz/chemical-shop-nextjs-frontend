import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import AddressEditForm from "./AddressEditForm";

const Address = () => {
  return (
    <div className=" p-2 align-center flex flex-col">
      <p>
        چهار راه طالقانی به سمت بیمارستان ارتش.نرسیده به قنادی پاپا. طبقه بالای
        گلفروشی لیلیوم. آموزشگاه جاویدان صنعت. آقای محمد نژاد
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <AddressEditForm data={null} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Address;
