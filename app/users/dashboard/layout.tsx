import DashboardSideBar from "@/app/components/Navigation/DashboardSideBar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" px-2 flex flex-row gap-3">
      <DashboardSideBar />
      {children}
    </div>
  );
}
