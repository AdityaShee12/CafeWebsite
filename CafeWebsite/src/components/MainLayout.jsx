import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0F0802]">
      <ToastContainer position="top-right" theme="dark" />
      <Navbar scrollY={scrollY} />
      <main className="flex-grow pt-[76px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
