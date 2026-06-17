import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/useAuth";

type ProfileFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export function ProfilePage() {
  const { user, updateProfile } =
    useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } =
    useForm<ProfileFormData>({
      mode: "onBlur",
      defaultValues: {
        name:
          user?.name ?? "",
        email:
          user?.email ?? "",
        password: "",
        repeatPassword:
          "",
      },
    });

  if (!user) {
    return (
      <section>
        <h1>
          Требуется
          авторизация
        </h1>
      </section>
    );
  }

  async function onSubmit(
    data: ProfileFormData
  ) {
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        password:
          data.password ||
          undefined,
      });

      reset({
        name: data.name,
        email: data.email,
        password: "",
        repeatPassword:
          "",
      });

      setError("root", {
        message:
          "Профиль сохранён",
      });
    } catch {
      setError("root", {
        message:
          "Ошибка сохранения профиля",
      });
    }
  }

  return (
    <section className="profile-page">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <h2>
            Мои действия
          </h2>

          <div className="profile-actions">
            <Link to="/create-prompt">
              ➕ Создать
              шаблон
            </Link>

            <Link to="/my-prompts">
              📁 Мои шаблоны
            </Link>

            <Link to="/favorites">
              ⭐ Избранное
            </Link>
          </div>
        </aside>

        <form
          className="auth-card profile-form"
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <h2>
            Основная
            информация
          </h2>

          <label className="auth-form__field">
            Имя

            <input
              type="text"
              {...register(
                "name",
                {
                  required:
                    "Введите имя",

                  minLength: {
                    value: 2,
                    message:
                      "Минимум 2 символа",
                  },
                }
              )}
            />

            {errors.name && (
              <span className="auth-field-error">
                {
                  errors
                    .name
                    .message
                }
              </span>
            )}
          </label>

          <label className="auth-form__field">
            Email

            <input
              type="email"
              {...register(
                "email",
                {
                  required:
                    "Введите email",

                  pattern: {
                    value:
                      /^\S+@\S+\.\S+$/,

                    message:
                      "Некорректный email",
                  },
                }
              )}
            />

            {errors.email && (
              <span className="auth-field-error">
                {
                  errors
                    .email
                    .message
                }
              </span>
            )}
          </label>

          <h2>
            Изменение
            пароля
          </h2>

          <label className="auth-form__field">
            Новый пароль

            <input
              type="password"
              placeholder="Оставьте пустым, чтобы не менять"
              {...register(
                "password",
                {
                  validate:
                    (value) =>
                      !value ||
                      value.length >=
                        6 ||
                      "Минимум 6 символов",
                }
              )}
            />

            {errors.password && (
              <span className="auth-field-error">
                {
                  errors
                    .password
                    .message
                }
              </span>
            )}
          </label>

          <label className="auth-form__field">
            Повторите пароль

            <input
              type="password"
              {...register(
                "repeatPassword",
                {
                  validate:
                    (
                      value
                    ) => {
                      const password =
                        getValues(
                          "password"
                        );

                      if (
                        !password
                      )
                        return true;

                      return (
                        value ===
                          password ||
                        "Пароли не совпадают"
                      );
                    },
                }
              )}
            />

            {errors.repeatPassword && (
              <span className="auth-field-error">
                {
                  errors
                    .repeatPassword
                    .message
                }
              </span>
            )}
          </label>

          {errors.root && (
            <p className="auth-error">
              {
                errors.root
                  .message
              }
            </p>
          )}

          <button
            type="submit"
            className="auth-form__submit"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}