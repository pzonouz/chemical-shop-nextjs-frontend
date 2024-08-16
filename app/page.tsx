import ProductListByCategory from "./components/data/ProductListByCategory";
import Copyright from "./components/Navigation/Copyright";
import Footer from "./components/Navigation/Footer";
import ToTop from "./components/Navigation/ToTop";
import { Store } from "./types";

export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/store/`, {
    cache: "no-cache",
  });
  const data: Store[] = await res.json();
  return (
    <main className="">
      <ProductListByCategory />
      <Footer store={data[0]} />
      <Copyright />
      <ToTop />
    </main>
  );
}
