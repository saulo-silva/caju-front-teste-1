import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard";
import NewUserPage from "@/pages/NewUser";

import routes from "./routes";

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
  },
  {
    path: routes.newUser,
    element: <NewUserPage />,
  },
  {
    path: "*",
    element: <DashboardPage />,
  },
]);

const Router = () => {
  return (
    <main role="main" style={{ marginTop: 64 }}>
      <RouterProvider router={router} />
    </main>
  );
};

export default Router;

