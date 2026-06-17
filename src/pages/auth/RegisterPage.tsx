import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/useAuth";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  personalDataConsent: boolean;
  marketingConsent: boolean;
};

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerUser(
        data.email,
        data.name,
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
        <h2>Регистрация</h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="auth-form__field">
            Имя

            <input
              type="text"
              placeholder="Введите имя"
              {...register("name", {
                required: "Введите имя",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />

            {errors.name && (
              <span className="auth-field-error">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="auth-form__field">
            Email

            <input
              type="email"
              placeholder="Введите email"
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Некорректный email",
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
                required: "Введите пароль",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
              })}
            />

            {errors.password && (
              <span className="auth-field-error">
                {errors.password.message}
              </span>
            )}
          </label>

          <label className="auth-form__field">
            Повторите пароль

            <input
              type="password"
              placeholder="Повторите пароль"
              {...register("repeatPassword", {
                required: "Повторите пароль",
                validate: (value) =>
                  value === getValues("password") ||
                  "Пароли не совпадают",
              })}
            />

            {errors.repeatPassword && (
              <span className="auth-field-error">
                {errors.repeatPassword.message}
              </span>
            )}
          </label>

          <label className="auth-checkbox">
            <input
              type="checkbox"
              {...register(
                "personalDataConsent",
                {
                  required:
                    "Требуется согласие на обработку персональных данных",
                }
              )}
            />

            <span>
              Я даю согласие на обработку
              персональных данных
            </span>
          </label>

          {errors.personalDataConsent && (
            <span className="auth-field-error">
              {errors.personalDataConsent.message}
            </span>
          )}

          <label className="auth-checkbox">
            <input
              type="checkbox"
              {...register(
                "marketingConsent"
              )}
            />

            <span>
              Я согласен получать
              рекламные рассылки
            </span>
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
            Зарегистрироваться
          </button>
        </form>
      </div>
    </section>
  );
}