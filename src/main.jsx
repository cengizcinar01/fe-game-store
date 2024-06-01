import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";

export const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        element: <RestrictedRoutes />,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "games",
        children: [
          {
            index: true,
            element: <Games />,
          },
          {
            path: ":gameId",
            element: <GameDetails />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
