import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";

import "../../styles/layout.css";
import "../../styles/auth.css";
import "../../styles/pages.css";
import "../../styles/editor.css";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}