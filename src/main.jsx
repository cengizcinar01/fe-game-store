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

const requiredEnvVars = ["VITE_API_URL"];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !import.meta.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(`Fehlende Umgebungsvariablen: ${missingEnvVars.join(", ")}`);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
      <h1>Fehlende Umgebungsvariablen</h1>
      <p>
        Bitte stelle sicher, dass die folgenden Umgebungsvariablen in der
        .env-Datei definiert sind:
      </p>
      <ul>
        {missingEnvVars.map((envVar) => (
          <li key={envVar}>{envVar}</li>
        ))}
      </ul>
    </div>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
