import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { spheres } from "../../data/spheres";
import { tools } from "../../data/tools";
import { researchCategories } from "../../data/researchCategories";
import { conversionTypes } from "../../data/conversionTypes";

export function PromptSearchForm() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [sphereId, setSphereId] = useState("");
  const [toolId, setToolId] = useState("");
  const [researchId, setResearchId] = useState("");
  const [conversionTypeId, setConversionTypeId] =
    useState("");

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const params =
      new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    if (sphereId) {
      params.set("sphere", sphereId);
    }

    if (toolId) {
      params.set("tool", toolId);
    }

    if (researchId) {
      params.set(
        "research",
        researchId
      );
    }

    if (conversionTypeId) {
      params.set(
        "conversion",
        conversionTypeId
      );
    }

    navigate(
      `/search?${params.toString()}`
    );
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название шаблона"
        value={query}
        onChange={(event) =>
          setQuery(
            event.target.value
          )
        }
      />

      <select
        value={sphereId}
        onChange={(event) =>
          setSphereId(
            event.target.value
          )
        }
      >
        <option value="">
          Все сферы
        </option>

        {spheres.map((sphere) => (
          <option
            key={sphere.id}
            value={sphere.id}
          >
            {sphere.name}
          </option>
        ))}
      </select>

      <select
        value={toolId}
        onChange={(event) =>
          setToolId(
            event.target.value
          )
        }
      >
        <option value="">
          Все инструменты
        </option>

        {tools.map((tool) => (
          <option
            key={tool.id}
            value={tool.id}
          >
            {tool.name}
          </option>
        ))}
      </select>

      <select
        value={researchId}
        onChange={(event) =>
          setResearchId(
            event.target.value
          )
        }
      >
        <option value="">
          Все категории
        </option>

        {researchCategories.map(
          (category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          )
        )}
      </select>

      <select
        value={conversionTypeId}
        onChange={(event) =>
          setConversionTypeId(
            event.target.value
          )
        }
      >
        <option value="">
          Все типы
        </option>

        {conversionTypes.map(
          (type) => (
            <option
              key={type.id}
              value={type.id}
            >
              {type.name}
            </option>
          )
        )}
      </select>

      <button
        type="submit"
        className="auth-form__submit"
      >
        Найти
      </button>
    </form>
  );
}