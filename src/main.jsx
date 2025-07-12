import ReactDOM from "react-dom/client";
import { AppProvider } from "./hooks/useGlobalReducer";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
