import type { Prompt } from "../types/prompt";

type Filters = {
  query?: string;
  sphere?: string;
  tool?: string;
  research?: string;
  conversion?: string;
};

export function filterPrompts(
  prompts: Prompt[],
  filters: Filters
): Prompt[] {
  const query =
    filters.query?.toLowerCase() ?? "";

  return prompts.filter(
    (prompt) => {
      const matchesQuery =
        !query ||
        prompt.result
          .toLowerCase()
          .includes(query);

      const matchesSphere =
        !filters.sphere ||
        prompt.sphere_id ===
          filters.sphere;

      const matchesTool =
        !filters.tool ||
        prompt.tools.includes(
          filters.tool
        );

      const matchesResearch =
        !filters.research ||
        prompt.researches.includes(
          filters.research
        );

      const matchesConversion =
        !filters.conversion ||
        prompt.conversion_type ===
          filters.conversion;

      return (
        matchesQuery &&
        matchesSphere &&
        matchesTool &&
        matchesResearch &&
        matchesConversion
      );
    }
  );
}