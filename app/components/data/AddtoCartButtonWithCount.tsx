const AddToCartButtonWithCount = ({ product }) => {
  return (
    <div className=" flex flex-col-reverse items-start justify-between w-full">
      <div className=" flex items-center gap-4">
        <button className="btn btn-primary">افزودن</button>
        <ul className="flex text-lg leading-5 rounded-md">
          <li className="p-3 cursor-pointer bg-base-300">
            <a>+</a>
          </li>
          <li className="p-3 text-black">
            <a>1</a>
          </li>
          <li className="p-3 cursor-pointer bg-base-300">
            <a>-</a>
          </li>
        </ul>
      </div>
      {/* <ul className="menu menu-horizontal bg-base-200 rounded-box self-end ">
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۱گرم</a>
    </li>
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۱۰گرم</a>
    </li>
    <li className={classNames({ active: unitActive == "1g" })}>
      <a>۵۰گرم</a>
    </li>
  </ul> */}
    </div>
  );
};

export default AddToCartButtonWithCount;
