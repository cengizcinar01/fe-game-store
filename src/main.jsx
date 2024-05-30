import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
