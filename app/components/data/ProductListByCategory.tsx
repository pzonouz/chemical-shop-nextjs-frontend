import Card from "./Card";

const ProductListByCategory = () => {
  return (
    <section className="pt-12 px-3 ">
      <div className="flex flex-row gap-2 items-center">
        <div className="flex-auto border-t-2 border-b-2 h-[6px] text-center align-middle"></div>
        <div>نانو ذرات</div>
        <div className="flex-auto border-t-2 border-b-2 h-[6px] text-center align-middle"></div>
      </div>
      <div className=" grid grid-cols-1 pt-6">
        <Card />
      </div>
    </section>
  );
};

export default ProductListByCategory;
