import { getSession } from "@auth0/nextjs-auth0";
import DashboardContent from "./DashboardContent";

export default async function Dashboard() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <h1>Access Denied</h1>
        <p>
          Please <a href="/api/auth/login">login</a> to view this page.
        </p>
      </div>
    );
  }

  return <DashboardContent />;
}
