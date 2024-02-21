import ProductListByCategory from "./components/data/ProductListByCategory";
import Copyright from "./components/Navigation/Copyright";
import Footer from "./components/Navigation/Footer";
import ToTop from "./components/Navigation/ToTop";

export default function Home() {
  return (
    <main className="">
      <ProductListByCategory />
      <Footer />
      <Copyright />
      <ToTop />
    </main>
  );
}
