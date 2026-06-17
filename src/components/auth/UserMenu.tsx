import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu__button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        👤 {user.name} ▼
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          <Link to="/profile" className="user-menu__link" onClick={() => setIsOpen(false)}>
            Профиль
          </Link>
          <button type="button" className="user-menu__logout" onClick={logout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}