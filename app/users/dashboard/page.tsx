import Dashboard from "@/app/components/data/Dashboard";
import fetchWithTokenServer from "@/app/utils/FetchWithTokenServer";

const DashboardPage = async () => {
  try {
    const response = await fetchWithTokenServer(
      `${process.env.BACKEND_URL}/api/users/`,
      "POST"
    );

    const user = await response.json();
    return <Dashboard user={user} />;
  } catch (error) {
    return <Dashboard user={null} />;
  }
};

export default DashboardPage;
