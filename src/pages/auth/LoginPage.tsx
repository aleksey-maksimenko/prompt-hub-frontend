import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/useAuth";

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(
        data.email,
        data.password
      );

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
      }
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>
          Авторизация в системе
        </h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="auth-form__field">
            Email

            <input
              type="email"
              placeholder="Введите email"
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message:
                    "Некорректный email",
                },
              })}
            />

            {errors.email && (
              <span className="auth-field-error">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="auth-form__field">
            Пароль

            <input
              type="password"
              placeholder="Введите пароль"
              {...register("password", {
                required:
                  "Введите пароль",
              })}
            />

            {errors.password && (
              <span className="auth-field-error">
                {errors.password.message}
              </span>
            )}
          </label>

          {errors.root && (
            <p className="auth-error">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            className="auth-form__submit"
          >
            Войти
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">
            Забыли пароль?
          </Link>
        </div>
      </div>
    </section>
  );
}