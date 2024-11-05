import React from "react";
import ReactDOM from "react-dom/client";
import Background from "./Components/AuroraBackground/Background";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import { Auth } from "./Components/Auth/Auth"; // Ensure this is a component for rendering
import RequireAuth from "./Components/Auth/RequireAuth"; // Import the RequireAuth component
import ProfessorDashboard from "./Components/Admin/professor-dashboard";
import StudentAttendanceSystem from "./Components/Student/student-attendance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Background />,
  },
  {
    path: "/Student",
    element: (
      <RequireAuth>
        <StudentAttendanceSystem />
      </RequireAuth>
    ),
  },
  {
    path: "/Professor",
    element: <ProfessorDashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
