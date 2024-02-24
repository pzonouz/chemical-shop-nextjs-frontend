import { NextRequest } from "next/server";

import Dashboard from "@/app/components/data/Dashboard";
import fetchWithTokenServer from "@/app/utils/FetchWithTokenServer";

const DashboardPage = async (request: NextRequest) => {
  try {
    const response = await fetchWithTokenServer(
      "http://localhost:3000/api/users/",
      "POST"
    );
    const user = await response.json();
    return <Dashboard user={user} />;
  } catch (error) {
    console.log(error);
    return <Dashboard user={null} />;
  }
};

export default DashboardPage;
