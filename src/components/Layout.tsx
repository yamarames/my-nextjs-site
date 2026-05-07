import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cursor from "./Cursor";

export default function Layout() {
  return (
    <div className="min-h-screen bg-sand relative selection:bg-amber/30 selection:text-charcoal">
      <div className="grain-overlay opacity-[0.03]" />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
