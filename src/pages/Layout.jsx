import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import { useEffect } from "react";
import { useAppContext } from "../hooks/useGlobalReducer";

export const Layout = () => {
  const { getContacts } = useAppContext();

  useEffect(() => {
    getContacts(); // fetch contacts globally on app load
  }, []);

  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
};
