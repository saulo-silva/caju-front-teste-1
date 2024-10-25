import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

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
    path: '*',
    element: <DashboardPage />,
  },
]);

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;

