import Image from "next/image";
import ProductListByCategory from "./components/ProductListByCategory";

export default function Home() {
  return (
    <main className="p-3">
      <ProductListByCategory />
    </main>
  );
}
