import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Dashboard from "./components/Dashboard.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./components/Loading.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/loading", element: <Loading /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
