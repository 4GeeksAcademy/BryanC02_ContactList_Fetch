import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import {Layout} from "./pages/Layout";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Single from "./pages/Single";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="add" element={<Single />} />
      <Route path="edit/:id" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);