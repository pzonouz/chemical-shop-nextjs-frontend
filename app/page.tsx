import ProductListByCategory from "./components/ProductListByCategory";
import Copyright from "./components/copyright";
import Footer from "./components/footer";
import ToTop from "./components/topTop";

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
