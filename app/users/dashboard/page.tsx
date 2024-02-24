import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import Dashboard from "@/app/components/data/Dashboard";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

const DashboardPage = async (request: NextRequest) => {
  const cookie = cookies();
  const token = cookie.get("next-auth.session-token");
  const response = await fetch("http://localhost:3000/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return <Dashboard />;
};

export default DashboardPage;
