import ProductListByCategory from "./components/ProductListByCategory";
import Copyright from "./components/Copyright";
import Footer from "./components/Footer";
import ToTop from "./components/ToTop";

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
