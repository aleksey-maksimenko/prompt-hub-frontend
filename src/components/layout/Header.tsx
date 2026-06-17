import { Link } from "react-router-dom";

import { Navigation } from "../navigation/Navigation";
import { AuthControls } from "../auth/AuthControls";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        🤖 Prompt hub
      </Link>

      <Navigation />

      <AuthControls />
    </header>
  );
}