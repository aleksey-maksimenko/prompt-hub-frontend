import { useForm } from "react-hook-form";

type ForgotPasswordFormData = {
  email: string;
};

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } =
    useForm<ForgotPasswordFormData>({
      mode: "onBlur",
    });

  function onSubmit(
    data: ForgotPasswordFormData
  ) {
    console.log(
      "Password recovery:",
      data
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>
          Восстановление пароля
        </h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="auth-form__field">
            Укажите email для
            восстановления доступа

            <input
              type="email"
              placeholder="Введите email"
              {...register("email", {
                required:
                  "Введите email",

                pattern: {
                  value:
                    /^\S+@\S+\.\S+$/,

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

          <button
            type="submit"
            className="auth-form__submit"
          >
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}