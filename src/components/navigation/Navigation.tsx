import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export function Navigation() {
  const { user } = useAuth();
  const [isDirectoriesOpen, setIsDirectoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDirectoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <ul className="navigation">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "navigation__link active" : "navigation__link"}>
            Каталог промптов
          </NavLink>
        </li>
        <li>
          <NavLink to="/research" className={({ isActive }) => isActive ? "navigation__link active" : "navigation__link"}>
            Исследования
          </NavLink>
        </li>
        <li ref={dropdownRef}>
          <button
            type="button"
            className="navigation__button"
            onClick={() => setIsDirectoriesOpen((prev) => !prev)}
          >
            Справочники ▼
          </button>
          {isDirectoriesOpen && (
            <ul className="navigation__submenu">
              <li>
                <NavLink to="/directories/spheres" className="navigation__submenu-link">
                  Сферы применения
                </NavLink>
              </li>
              <li>
                <NavLink to="/directories/tools" className="navigation__submenu-link">
                  Инструменты
                </NavLink>
              </li>
              <li>
                <NavLink to="/directories/conversion-types" className="navigation__submenu-link">
                  Типы конвертации
                </NavLink>
              </li>
              <li>
                <NavLink to="/directories/research-categories" className="navigation__submenu-link">
                  Категории исследований
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {user && (
          <li>
            <NavLink to="/create-prompt" className="navigation__link">
              + Создать
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}