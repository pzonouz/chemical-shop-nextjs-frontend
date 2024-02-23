import React from "react";

const AddressEditForm = ({ data }: { data: any }) => {
  return (
    <form className="flex flex-col p-4 gap-4">
      <textarea
        className="textarea textarea-bordered"
        placeholder="آدرس جدید را وارد کنید"
      ></textarea>
      <button className=" btn btn-primary">ثبت</button>
    </form>
  );
};

export default AddressEditForm;
