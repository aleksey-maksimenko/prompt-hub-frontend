import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  getAllPrompts,
} from "../api/promptsApi";

import PromptGrid from "../components/prompt/PromptGrid";

import type {
  Prompt,
} from "../types/prompt";

import { filterPrompts } from "../utils/filterPrompts";

export function SearchResultsPage() {
  const [searchParams] =
    useSearchParams();

  const [prompts, setPrompts] =
    useState<Prompt[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function search() {
      const allPrompts =
        await getAllPrompts();

      const query =
        searchParams
          .get("query")
          ?.toLowerCase() ?? "";

      const sphere =
        searchParams.get(
          "sphere"
        );

      const tool =
        searchParams.get(
          "tool"
        );

      const research =
        searchParams.get(
          "research"
        );

      const conversion =
        searchParams.get(
          "conversion"
        );

      const filtered = filterPrompts(allPrompts,
                        {
                            query,
                            sphere: sphere ?? "",
                            tool: tool ?? "",
                            research:
                                research ?? "",
                            conversion:
                                conversion ?? "",
                        }
    );

      setPrompts(filtered);
      setLoading(false);
    }

    search();
  }, [searchParams]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!prompts.length) {
    return (
      <p>
        По вашему запросу
        ничего не найдено
      </p>
    );
  }

  return (
    <PromptGrid prompts={prompts} />
  );
}