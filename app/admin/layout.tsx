import AdminMenu from "../components/admin/AdminMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-6 px-2 flex flex-row gap-3">
      <AdminMenu />
      {children}
    </main>
  );
}
