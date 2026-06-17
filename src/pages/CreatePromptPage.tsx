import { useRef, useState } from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "../context/useAuth";

import { PromptEditor } from "../components/prompt-editor/PromptEditor";
import { PromptPreview } from "../components/prompt-editor/preview/PromptPreview";
import { Toolbar } from "../components/prompt-editor/toolbar/Toolbar";

import type {
  ToolbarActionId,
} from "../components/prompt-editor/toolbar/toolbarActions";

import {
  applyToolbarAction,
} from "../utils/applyToolbarAction";

import { spheres } from "../data/spheres";
import { tools } from "../data/tools";
import { researchCategories } from "../data/researchCategories";
import { conversionTypes } from "../data/conversionTypes";

import { createPrompt } from "../api/promptsApi";

type PromptFormData = {
  title: string;
  sphereId: string;
  toolId: string;
  researchId: string;
  conversionTypeId: string;
};

export function CreatePromptPage() {
  const { user } = useAuth();

  const navigate =
    useNavigate();

  const editorRef =
    useRef<HTMLTextAreaElement>(null);

  const currentUser =
    user;

  const [prompt, setPrompt] =
    useState(`## Заголовок

Введите текст промпта...
`);

  const [error,
    setError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =
    useForm<PromptFormData>();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const handleToolbarAction = (
    action: ToolbarActionId
  ) => {
    const textarea =
      editorRef.current;

    if (!textarea) {
      return;
    }

    const result =
      applyToolbarAction(
        prompt,
        textarea.selectionStart,
        textarea.selectionEnd,
        action
      );

    setPrompt(result.value);

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.setSelectionRange(
        result.selectionStart,
        result.selectionEnd
      );
    });
  };

  async function handleSave(
    data: PromptFormData
  ) {
    setError("");

    if (
      prompt.trim().length < 20
    ) {
      setError(
        "Текст промпта слишком короткий"
      );
      return;
    }

    try {
      await createPrompt({
        user_id:
          String(
            currentUser!.id
          ),

        prompt,

        result:
          data.title,

        likes: 0,

        researches: [
          data.researchId,
        ],

        tools: [
          data.toolId,
        ],

        conversion_type:
          data.conversionTypeId,

        sphere_id:
          data.sphereId,
      });

      navigate(
        "/my-prompts"
      );
    } catch {
      setError(
        "Не удалось сохранить шаблон"
      );
    }
  }

  return (
    <div className="create-prompt-page">
      <div className="prompt-workspace">
        <section className="editor-panel">
          <h2>Редактор</h2>

          <Toolbar
            onAction={
              handleToolbarAction
            }
          />

          <div className="editor-container">
            <PromptEditor
              ref={editorRef}
              value={prompt}
              onChange={setPrompt}
            />
          </div>
        </section>

        <section className="preview-panel">
          <h2>Предпросмотр</h2>

          <div className="preview-container">
            <PromptPreview
              content={prompt}
            />
          </div>
        </section>

        <aside className="prompt-meta-panel">
          <h2>Параметры</h2>

          <div className="form-field">
            <label htmlFor="title">
              Название шаблона
            </label>

            <input
              id="title"
              type="text"
              placeholder="Например: Анализ требований"
              {...register(
                "title",
                {
                  required:
                    "Введите название шаблона",
                  minLength: {
                    value: 3,
                    message:
                      "Минимум 3 символа",
                  },
                }
              )}
            />

            {errors.title && (
              <p className="auth-error">
                {
                  errors.title
                    .message
                }
              </p>
            )}
          </div>

          <div className="form-field">
            <label>
              Сфера
            </label>

            <select
              {...register(
                "sphereId",
                {
                  required:
                    "Выберите сферу",
                }
              )}
            >
              <option value="">
                Выберите сферу
              </option>

              {spheres.map(
                (sphere) => (
                  <option
                    key={sphere.id}
                    value={
                      sphere.id
                    }
                  >
                    {
                      sphere.name
                    }
                  </option>
                )
              )}
            </select>

            {errors.sphereId && (
              <p className="auth-error">
                {
                  errors
                    .sphereId
                    .message
                }
              </p>
            )}
          </div>

          <div className="form-field">
            <label>
              Инструмент
            </label>

            <select
              {...register(
                "toolId",
                {
                  required:
                    "Выберите инструмент",
                }
              )}
            >
              <option value="">
                Выберите инструмент
              </option>

              {tools.map(
                (tool) => (
                  <option
                    key={tool.id}
                    value={
                      tool.id
                    }
                  >
                    {
                      tool.name
                    }
                  </option>
                )
              )}
            </select>

            {errors.toolId && (
              <p className="auth-error">
                {
                  errors.toolId
                    .message
                }
              </p>
            )}
          </div>

          <div className="form-field">
            <label>
              Категория исследования
            </label>

            <select
              {...register(
                "researchId",
                {
                  required:
                    "Выберите категорию исследования",
                }
              )}
            >
              <option value="">
                Выберите категорию
              </option>

              {researchCategories.map(
                (
                  category
                ) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </option>
                )
              )}
            </select>

            {errors.researchId && (
              <p className="auth-error">
                {
                  errors
                    .researchId
                    .message
                }
              </p>
            )}
          </div>

          <div className="form-field">
            <label>
              Тип преобразования
            </label>

            <select
              {...register(
                "conversionTypeId",
                {
                  required:
                    "Выберите тип преобразования",
                }
              )}
            >
              <option value="">
                Выберите тип
              </option>

              {conversionTypes.map(
                (type) => (
                  <option
                    key={type.id}
                    value={
                      type.id
                    }
                  >
                    {
                      type.name
                    }
                  </option>
                )
              )}
            </select>

            {errors.conversionTypeId && (
              <p className="auth-error">
                {
                  errors
                    .conversionTypeId
                    .message
                }
              </p>
            )}
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="button"
            className="save-button"
            onClick={handleSubmit(
              handleSave
            )}
          >
            Сохранить шаблон
          </button>
        </aside>
      </div>
    </div>
  );
}