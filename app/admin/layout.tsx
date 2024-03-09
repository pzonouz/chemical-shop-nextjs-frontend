import { getServerSession } from "next-auth";
import AdminMenu from "../components/admin/AdminMenu";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  // if (!session) {
  //   return redirect("/api/auth/signin");
  // }
  // if (!session?.user) {
  //   return redirect("/api/auth/signin");
  // }
  // const user = await prisma.user.findUnique({
  //   where: { email: session?.user?.email! },
  // });
  // if (user?.role !== "admin") {
  //   return <div className="p-8">شما مجاز به ورود نیستید</div>;
  // }
  return (
    <main className="mt-6 px-2 flex flex-row gap-3">
      <AdminMenu />
      {children}
    </main>
  );
}
