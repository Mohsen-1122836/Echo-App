import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 pt-4 min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
