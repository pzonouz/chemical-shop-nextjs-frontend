import AdminStoreForm from "@/app/components/admin/AdminStoreForm";
import { Store } from "@/app/types";

export default async function StorePage() {
  let store: Store;
  const res = await fetch(`${process.env.BACKEND_URL}/store`, {
    cache: "no-cache",
  });
  const data = await res.json();
  store = data[0];
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <AdminStoreForm store={store} />
    </div>
  );
}
