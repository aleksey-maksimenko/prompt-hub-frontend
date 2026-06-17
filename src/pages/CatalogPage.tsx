import { useEffect, useState } from "react";

import { getAllPrompts } from "../api/promptsApi";

import PromptGrid from "../components/prompt/PromptGrid";
import { PromptSearchForm } from "../components/search/PromptSearchForm";

import type { Prompt } from "../types/prompt";

export default function CatalogPage() {
  const [prompts, setPrompts] =
    useState<Prompt[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadPrompts() {
      try {
        const data =
          await getAllPrompts();

        setPrompts(data);
      } catch {
        setError(
          "Не удалось загрузить каталог"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPrompts();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <PromptSearchForm />

      <PromptGrid prompts={prompts} />
    </>
  );
}