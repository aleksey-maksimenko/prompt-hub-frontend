import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getPromptById,
} from "../api/promptsApi";

import { PromptPreview } from "../components/prompt-editor/preview/PromptPreview";

import type { Prompt } from "../types/prompt";

export default function PromptDetailsPage() {
  const { id } = useParams();

  const [prompt, setPrompt] =
    useState<Prompt | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadPrompt() {
      if (!id) {
        return;
      }

      try {
        const data =
          await getPromptById(id);

        setPrompt(data);
      } catch {
        setError(
          "Не удалось загрузить шаблон"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPrompt();
  }, [id]);

  const handleCopy = async () => {
    if (!prompt) {
      return;
    }

    await navigator.clipboard.writeText(
      prompt.prompt
    );
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!prompt) {
    return <p>Шаблон не найден</p>;
  }

  return (
    <div className="prompt-details-page">
      <h2 className="prompt-details-page__title">
        {prompt.result}
      </h2>

      <div className="prompt-details">
        <aside className="prompt-details__meta">
          <div className="prompt-details__section">
            <h3>Сфера</h3>

            <p>{prompt.sphere_id}</p>
          </div>

          <div className="prompt-details__section">
            <h3>Инструменты</h3>

            <p>
              {prompt.tools.join(", ")}
            </p>
          </div>

          <div className="prompt-details__section">
            <h3>Тип</h3>

            <p>
              {
                prompt.conversion_type
              }
            </p>
          </div>

          <div className="prompt-details__section">
            <h3>
              Категории исследований
            </h3>

            <div className="prompt-details__tags">
              {prompt.researches.map(
                (item) => (
                  <span
                    key={item}
                    className="prompt-tag"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="prompt-details__likes">
            👍 {prompt.likes} лайков
          </div>
        </aside>

        <section className="prompt-details__content">
          <div className="prompt-details__preview">
            <PromptPreview
              content={prompt.prompt}
            />
          </div>

          <aside className="prompt-details__actions">
            <button
              onClick={handleCopy}
              className="prompt-action-button"
            >
              📋 Копировать
            </button>

            <button
              className="prompt-action-button prompt-action-button--secondary"
            >
              ⭐ В избранное
            </button>
          </aside>
        </section>
      </div>
    </div>
  );
}