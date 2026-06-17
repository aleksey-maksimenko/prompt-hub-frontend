import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import { getUserPrompts } from "../api/promptsApi";

import PromptGrid from "../components/prompt/PromptGrid";

import type { Prompt } from "../types/prompt";

export function MyPromptsPage() {
  const { user } = useAuth();

  const [prompts, setPrompts] =
    useState<Prompt[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadPrompts() {
      if (!user) {
        return;
      }

      try {
        const data =
          await getUserPrompts(
            String(user.id)
          );

        setPrompts(data);
      } catch {
        setError(
          "Не удалось загрузить шаблоны"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPrompts();
  }, [user]);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (prompts.length === 0) {
    return (
      <section>
        <h2>Мои шаблоны</h2>

        <p>
          У вас пока нет
          сохранённых шаблонов
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>Мои шаблоны</h1>

      <PromptGrid
        prompts={prompts}
      />
    </section>
  );
}