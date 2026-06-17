import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { UserMenu } from "./UserMenu";

export function AuthControls() {
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="auth-controls">
      <Link to="/login" className="auth-controls__button">
        Войти
      </Link>
      <Link to="/register" className="auth-controls__button auth-controls__button--primary">
        Регистрация
      </Link>
    </div>
  );
}